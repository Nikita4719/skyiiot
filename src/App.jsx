import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import About_us from "./components/About_us";
import Solutions from "./components/Solutions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Embeded from "./components/Embeded";
import Embeded2 from "./components/Embeded2";
import Faqs from "./components/Faqs";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Details from "./components/Details";
import Transform_monitor from "./components/Transform_monitor";
import "./index.css";
import Carousal2 from "./components/Carousal2";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Embeded />
      <Embeded2 />
      <Carousal2 />
      <Team />
      <Testimonials />
      <Faqs />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About_us />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/transform-monitor/:id" element={<Transform_monitor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

