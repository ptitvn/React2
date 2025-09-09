import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/bt1/Home";
import Contact from "./components/bt1/Contact";
import About from "./components/bt1/About";
import Login from "./components/bt3/Login";
import Header from "./components/bt6/Header";



function App() {
  return (
    <><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <div>
      <Header />
      <Outlet />
    </div>
  </>
  

  )
}

export default App;