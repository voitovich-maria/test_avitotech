import { advertisementsApi, ordersApi } from '@/shared';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [advertisementsApi.reducerPath]: advertisementsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(advertisementsApi.middleware, ordersApi.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
