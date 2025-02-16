import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaBurger } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import Button from "./Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  const { progress } = useSmoothScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    if (progress > lastScrollY) {
      setIsNavVisible(false);
      headerRef.current.classList.remove("floating-nav");
    } else if (progress < lastScrollY) {
      setIsNavVisible(true);
      headerRef.current.classList.add("floating-nav");
    } else if (progress <= 10) {
      setIsNavVisible(true);
      headerRef.current.classList.remove("floating-nav");
    }

    setLastScrollY(progress);
  }, [lastScrollY, progress]);

  useEffect(() => {
    gsap.to(headerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.5,
    });
  }, [isNavVisible]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <nav className="flex size-full items-center justify-between p-4 py-5">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="logo" className="w-12" />
          <Button className="!bg-white !text-black">
            <TiLocation />
            <span>Products</span>
          </Button>
        </div>

        <div className="md:hidden">
          <FaBurger />
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {navItems.map((item, index) => (
            <button className="nav-hover-btn" key={index}>
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
