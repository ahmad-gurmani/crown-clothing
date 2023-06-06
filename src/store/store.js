import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

import logger from 'redux-logger';

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);




export const store = configureStore({
    reducer: rootReducer,
    // middleware: middlewares  

    // or 

    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }).concat(middlewares),

    // or

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
});
