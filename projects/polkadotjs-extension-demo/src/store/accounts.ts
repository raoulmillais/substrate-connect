import type { ComputedRef } from 'vue';
import { createStore } from '@harlem/core';

import { Account } from '../services/extension';
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

export const updateAccounts = mutation<Account[] | null>('updateAccounts', (state, accountsData) => {
  if (accountsData === undefined || accountsData === null) {
    storage.remove('accounts');
    state.accounts = null;
    return;
  }

  storage.set('accounts', accountsData);
  state.accounts = accountsData;
});
