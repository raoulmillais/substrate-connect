// hack to make poladot-js work without bringing in webpack and babel
import "regenerator-runtime/runtime"

import { ApiPromise } from '@polkadot/api';
import { SmoldotProvider }  from '@substrate/smoldot-provider';
import UI, { emojis } from './view';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';

const APP_NAME = 'polkadotjs-extension-demo';

window.onload = () => {
  const loadTime = performance.now();
  const ui = new UI({ containerId: 'messages' }, { loadTime });
  ui.showSyncing();

  (async () => {
  /*
   * CHAIN API SETUP
   *
   */
    const response =  await fetch('./assets/westend.json')
    if (!response.ok) {
      ui.error(new Error('Error downloading chain spec'));
    }

    const chainSpec =  await response.text();
    const provider = new SmoldotProvider(chainSpec);
    await provider.connect();
    try {
      const api = await ApiPromise.create({ provider })
      // Show how many peers we are syncing with
      const health = await api.rpc.system.health();
      const peers = Number(health.peers) === Number(1) ? '1 peer' : `${health.peers} peers`;
      ui.log(`${emojis.stethoscope} Chain is syncing with ${peers}`);

      // Check the state of syncing every 2s and update the syncing state message
      //
      // Resolves the first time the chain is fully synced so we can wait before
      // adding subscriptions. Carries on pinging to keep the UI consistent 
      // in case syncing stops or starts.
      const waitForChainToSync = () => {
        let resolved = false;
        return new Promise<void>((resolve, reject) => {
          setInterval(() => {
            api.rpc.system.health().then(health => {
              if (!health.isSyncing) {
                ui.showSynced();
                if (!resolved) {
                  resolved = true;
                  resolve();
                }
              } else {
                ui.showSyncing();
              }
            }).catch(error => {
              ui.error(error);
            });
          }, 2000);
        });
      }

      /*
       * POLKADOT-JS EXTENSION
       *
       */

      // returns an array of all the injected sources
      // (this needs to be called first, before other requests)
      const extensions = await web3Enable(APP_NAME);

      if (extensions.length === 0) {
        ui.error(new Error('No extension installed or was not authorised by user.'));
      }

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      const allAccounts = await web3Accounts();

      console.log(allAccounts);

      /*
       * CHAIN INTERACTION - AFTER SYNCED
       *
       */

      await waitForChainToSync();
      ui.log(`${emojis.newspaper} Subscribing to new block headers`);
      await api.rpc.chain.subscribeNewHeads((lastHeader) => {
        ui.log(`${emojis.brick} New block #${lastHeader.number} has hash ${lastHeader.hash}`);
      });
    } catch (error) {
        ui.error(error);
    }

  })();
};
