import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import machineTypesReducer from '../features/manage-machine/machineTypesSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['machinesTypes'],
};

const reducers = combineReducers({
  counter: counterReducer,
  machineTypes: machineTypesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
