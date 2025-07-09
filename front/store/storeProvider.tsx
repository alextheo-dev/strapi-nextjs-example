'use client';

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from './index';
persistStore(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default StoreProvider;
