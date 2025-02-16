import "locomotive-scroll/src/locomotive-scroll.scss";
import About from "./components/About";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Partners from "./components/Partners";
import Pin from "./components/Pin";
import Story from "./components/Story";
import { locoScroller } from "./constants/constants";
import { SmoothScrollProvider } from "./context/SmoothScrollContext";
import { cn } from "./utils/utils";

function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <div className={cn("bg-blue-50", locoScroller)}>
        <Hero />
        <AboutUs />
        <Features />
        <Story />
        <Pin />
        <About />
        <Partners />
        <ContactUs />
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
