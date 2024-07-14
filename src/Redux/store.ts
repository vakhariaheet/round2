import { combineReducers, configureStore,  } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import UserReducer from './Slices/UserSlice';

const reducers = combineReducers({
    user: UserReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [],
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true, 
});
export const persistedStore = persistStore(store);
export default store;