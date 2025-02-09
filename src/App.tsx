import HeroSection from "../components/HeroSection"
import Appbar from "../components/Appbar"
import Testlobby from "../components/Screens/Testlobby"
import Test from "../components/Screens/Test"
import Readmore from "../components/Screens/Readmore.tsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() { 

  return (
   <div>
  <Router>
    <Appbar/>
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/lobby" element={<Testlobby />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/question/readmore/:id" element={<Readmore />} />
    </Routes>
   </Router>

   </div>
  )
}

export default App
