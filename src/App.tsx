import HeroSection from "../components/HeroSection"
import Appbar from "../components/Appbar"
import Testlobby from "../components/Screens/Testlobby"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() { 

  return (
   <div>
  <Router>
    <Appbar/>
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/lobby" element={<Testlobby />} />
    </Routes>
   </Router>

   </div>
  )
}

export default App
