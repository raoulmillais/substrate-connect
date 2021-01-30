export interface Account {
  address: string;
  meta: {
    genesisHash?: string | null;
    name?: string;
    source: string;
  };
}

/*
export async function accounts(): Promise<Account[]> {
  // TODO
  return new Promise<Account[]>();
}
*/

export async function disable(): Promise<void> {
  // TODO
}
