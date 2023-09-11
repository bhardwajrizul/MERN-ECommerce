/* eslint-disable */
import Homepage from './pages/Homepage'
import cardData from "./utils/cardData"
import features from "./utils/featuresData"


function App() {
  
  return (
    <Homepage cardData={cardData} features={features} />
  )
}

export default App
