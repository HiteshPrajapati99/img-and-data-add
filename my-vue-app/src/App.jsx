import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heder from "./Components/Navbar/Heder";
import Home from "./Components/Home";
import About from "./Components/About";
import Useradd from "./Components/Useradd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Heder />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about/:id" element={<About />} />
          <Route path="form" element={<Useradd />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
