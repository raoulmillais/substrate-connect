import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

const APP_NAME = 'polkadotjs-extension-demo';

export interface Account {
  address: string;
  meta: {
    genesisHash?: string | null;
    name?: string;
    source: string;
  };
}

export interface AccountsResult {
  ok: Boolean;
  accounts: Account[] | null;
}

export async function enable(): Promise<AccountsResult> {
  const extensions = await web3Enable(APP_NAME);

  if (extensions.length === 0) {
    return { ok: false, accounts: null };
  }

  const allAccounts = await web3Accounts();

  return {
    ok: true,
    accounts: allAccounts
  };
}

export async function disable(): Promise<void> {
  // TODO
}
