/* eslint-disable */
import Navbar from "./components/Navbar"
import Carousel from "./components/Carousel"
import Panel from "./components/Panel"
import Homepage from "./pages/HomePage"

import cardData from "./utils/cardData"
import features from "./utils/featuresData"


function App() {
  
  return (
    <Homepage cardData={cardData} features={features} />
  )
}

export default App
