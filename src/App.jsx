/* eslint-disable */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import Homepage from './pages/Homepage'
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage'


import cardData from "./utils/cardData"
import features from "./utils/featuresData"

function App() {
  return (
    <Router>
      <div className='mx-3'> 
        {/* HEADER */}
        <Navbar />
        {/* ROUTES */}
        <Routes>
          <Route path='/' element={<Homepage cardData={cardData} features={features} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/products' element={<ProductsPage />} />
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
