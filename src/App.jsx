/* eslint-disable */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
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

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { resetUser, setUser, setUserLoading } from './store';

function App() {
  const uidParam = useParams().uid;
  const { filterCount, userLoading, userId } = useSelector((state) => {
    return {
      filterCount: state.filters.countFiltersApplied,
      userLoading: state.user.loading,
      userId: state.user.userId
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = { ...user }
        dispatch(setUser({ email: userData.email, uid: userData.uid }))
      } else {
        dispatch(resetUser())
      }
    })
    return () => unSubscribe();
  }, [dispatch])



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
          <Route path='/user/:uid' element={<ProfilePage />} />
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
