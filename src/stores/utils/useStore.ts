import { useContext } from 'react';

import { RootStore } from '../RootStore';
import { StoreContext } from './storeContext';

export function useStore(): RootStore {
  return useContext(StoreContext);
}
