import { combineReducers, configureStore,  } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Reducers
import UserReducer from './Slices/UserSlice';

const reducers = combineReducers({
    user: UserReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    devTools: true,
    
});