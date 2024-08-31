
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import productSlice from "../features/productSlice";
import accountsSlice from "../features/accountsSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import adminSlice from "../features/adminSlice";

// Config for redux-persist
const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'], // Only persist the user slice
};

const rootReducer = combineReducers({
    user: userSlice,
    products: productSlice,
    accounts: accountsSlice,
    admin: adminSlice,
});

// Persisted user slice
const persistedUserReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedUserReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;









// ==============================================

// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "../features/userSlice";
// import productSlice from "../features/productSlice";
// import accountsSlice from "../features/accountsSlice";


// const store = configureStore({
//     reducer: {
//         user: userSlice,
//         products: productSlice,
//         accounts: accountsSlice
        
//     }
// })

// export type RootState = ReturnType<typeof store.getState>
// export default store


























