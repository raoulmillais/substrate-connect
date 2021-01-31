import type { ComputedRef } from 'vue';
import { createStore, Commit } from 'vuex';
import {
  web3Accounts,
  web3Enable,
} from '@polkadot/extension-dapp';

// Will be used to store transactions?  Should it be?  Do they get stored in the
// light client's database?
import storage from '../utils/storage';

const APP_NAME = 'polkadotjs-extension-demo';

interface ChainState {
  messages: string[];
}

interface State {
  chain: ChainState | null;
  accounts: Account[] | null;
}

export interface Account {
  address: string;
  meta: {
    genesisHash?: string | null;
    name?: string;
    source: string;
  };
}

const state: State = {
  chain: null,
  accounts: null
};

const getters = {
  isConnected: (state: State) => state.accounts !== null,
  accounts: (state: State) => state.accounts
};

const mutations = {
  setAccounts: (state: State, accounts: Account[]) => {
    state.accounts = accounts;
  },
  clearAccounts: (state: State) => {
    state.accounts = null;
  }
};

const actions = {
  async connectExtension({ commit }: {commit: Commit}) {
    const extensions = await web3Enable(APP_NAME);

    if (extensions.length === 0) {
      return commit('clearAccounts');
    }

    const accounts = await web3Accounts();
    return commit('setAccounts', accounts);
  }
};

export default createStore({
  state,
  getters,
  actions,
  mutations
});
