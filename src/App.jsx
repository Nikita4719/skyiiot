import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import About_us from "./components/About_us";
import Solutions from "./components/Solutions";
// import SolutionDetail from "./components/SolutionDetail";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Embeded from "./components/Embeded";
import Detail3 from "./components/Detail3"; 
import Embeded2 from "./components/Embeded2";
import Carousal from "./components/Carousal";
import Faqs from "./components/Faqs";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Details from "./components/Details";
import Detail1 from "./components/Detail1";
import Detail2 from "./components/Detail2";
import Transform_monitor from "./components/Transform_monitor";
import Pump_automate from "./components/Pump_automate";
import Light_monitor from "./components/Light_monitor";
import Rtu_solution from "./components/Rtu_solution";
import Detail4 from "./components/Detail4";
import Detail5 from "./components/Detail5";
import Detail6 from "./components/Detail6";
import Detail7 from "./components/Detail7";
import Detail8 from "./components/Detail8";
import Detail9 from "./components/Detail9";
import Detail10 from "./components/Detail10";
import Detail11 from "./components/Detail11";
import Detail12 from "./components/Detail12";
import Detail13 from "./components/Detail13";
import Detail14 from "./components/Detail14";
import Detail15 from "./components/Detail15";
import Detail16 from "./components/Detail16";
import "./index.css";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Embeded />
      <Embeded2/>
      <Carousal/>
      <Team/>
      <Testimonials/>
      <Faqs/>
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
        {/* <Route path="/solution/:id" element={<SolutionDetail />} /> */}
        {/* <Route path="/details/1" element={<Detail1 />} />
        <Route path="/details/2" element={<Detail2 />} />
        <Route path="/details/3" element={<Detail3 />} /> */}
        <Route path="/transform-monitor/:id" element={<Transform_monitor />} />
        <Route path="/pump-automate" element={<Pump_automate />} />
        <Route path="/light-monitor" element={<Light_monitor />} />
        <Route path="/rtu-solution" element={<Rtu_solution />} />
        {/* <Route path="/details/:id" element={<Detail4 />} /> */}
        {/* <Route path="/details/5" element={<Detail5 />} />
        <Route path="/details/6" element={<Detail6 />} />
        <Route path="/details/7" element={<Detail7 />} />
        <Route path="/details/8" element={<Detail8 />} />
        <Route path="/details/9" element={<Detail9 />} />
        <Route path="/details/10" element={<Detail10 />} />
        <Route path="/details/11" element={<Detail11 />} />
        <Route path="/details/12" element={<Detail12/>} />
        <Route path="/details/13" element={<Detail13 />} />
        <Route path="/details/14" element={<Detail14 />} />
        <Route path="/details/15" element={<Detail15 />} />
        <Route path="/details/16" element={<Detail16 />} /> */}
        

      </Routes>


      <Footer />

    </BrowserRouter>
  );
}

export default App;
//apps->display layout->of components
