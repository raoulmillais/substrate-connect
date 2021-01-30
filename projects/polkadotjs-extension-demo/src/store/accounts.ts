import type { ComputedRef } from 'vue';
import { createStore } from '@harlem/core';

import { Account } from '../services';
import storage from '../utils/storage';

interface State {
  accounts: Account[] | null;
}

const STATE: State = {
  accounts: storage.get<Account[]>('accounts'),
};

const { getter, mutation } = createStore<State>('accounts', STATE);

export const accounts = getter('accounts', state => state.accounts);

export const isAuthorized = getter('isAuthorized', () => checkAuthorization(accounts));

export const checkAuthorization = (accounts: ComputedRef<readonly Account[] | null>): accounts is ComputedRef<Account[]> => {
  return accounts !== null
};

export const updateUser = mutation<Account[] | null>('updateAccounts', (state, accountsData) => {
  if (accountsData === undefined || accountsData === null) {
    storage.remove('accounts');
    // TODO: disconnect from extension?
    state.accounts = null;
    return;
  }

  storage.set('accounts', accountsData);
  // TODO: Authorise extension and retrieve accounts
  state.accounts = accountsData;
});
