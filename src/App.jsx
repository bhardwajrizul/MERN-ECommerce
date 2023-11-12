/* eslint-disable */
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Homepage from './pages/Homepage'
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage'
import ScrollToTop from './components/ScrollToTop';


import cardData from "./utils/cardData"
import features from "./utils/featuresData"
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from './pages/ProfilePage';
import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { resetUser, setToken, setUser, setUserLoading } from './store';
import ProductInfoPage from './pages/ProductInfoPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import Payment from './pages/Payment';
import OrdersPage from './pages/OrdersPage';
import TooManyReq from './pages/TooManyReq';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/Terms&Conditions';

function App() {
  const { filterCount, userLoading, userId, token } = useSelector((state) => {
    return {
      filterCount: state.filters.countFiltersApplied,
      userLoading: state.user.loading,
      userId: state.user.userId,
      token: state.user.token
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUserLoading(true));

      if (user) {
        // User is signed in, handle user data.
        // console.log(user);
        // Get the ID token asynchronously.
        user.getIdToken(true).then(idToken => {
          dispatch(setUser({ email: user.email, uid: user.uid, token: idToken }));
        }).catch(error => {
          console.error('Error fetching ID token', error);
          dispatch(resetUser());
        })
      } else {
        // User is signed out, reset user state.
        dispatch(resetUser());
      }
    });

    // Cleanup function to unsubscribe from the auth state observer.
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // console.log(`USER ID : ${userId} TOKEN: ${token}`)


  // console.log(filterCount);
  return (
    <Router>
      <div className='mx-3'>
        <ScrollToTop />
        {/* HEADER */}
        <Navbar />
        {/* ROUTES */}
        <Routes>
          <Route path='/' element={<Homepage cardData={cardData} features={features} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:pid' element={<ProductInfoPage />} />
          <Route path='/user/:uid' element={<ProfilePage />} />
          <Route path='/user/:uid/wishlist' element={<WishlistPage />} />
          <Route path='/user/:uid/cart' element={<CartPage />} />
          <Route path='/user/:uid/orders' element={<OrdersPage />} />
          <Route path='/paymentConfirm' element={<Payment />} />
          <Route path='/too-many-requests' element={<TooManyReq />} />
          <Route path='/aboutus' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />


        </Routes>
        {/* FOOTER */}
        <Panel>
          <Footer />
        </Panel>
      </div>
    </Router>
  )
}

export default App
