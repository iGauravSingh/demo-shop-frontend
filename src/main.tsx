import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from './pages/Homepage.tsx';

import Catalog from './pages/Catalog.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import Profile from './pages/Profile.tsx';
import AdminSignin from './pages/AdminSignin.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
// import AdminDashboard from './pages/AdminDashboard.tsx';
import NotFound from './pages/NotFound.tsx';
import { ShopContextProvider } from './context/ShopContexts.tsx';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store.ts';
import AdminControl from './pages/Admin/AdminControl.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import BlogList from './pages/BlogList.tsx';
import BlogDetail from './pages/BlogDetail.tsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homepage />} />
      <Route path="blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* auth routes  */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/adminsignin" element={<AdminSignin />} />
      <Route path="/admindashboard" element={<AdminControl />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} /> 

      {/* // */}
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ShopContextProvider>
      <PersistGate persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </ShopContextProvider>
    </Provider>
  </StrictMode>,
)
