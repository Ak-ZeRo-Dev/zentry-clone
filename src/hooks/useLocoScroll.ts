import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import { useLayoutEffect, useState } from "react";
import { locoScrollerClass } from "../constants/constants";

/**
 * Initializes Locomotive Scroll and sets up ScrollTrigger to work with it.
 * Provides the Locomotive Scroll instance and the current scroll progress.
 * @returns An object with two properties: `locoScroll` and `progress`.
 * `locoScroll` is the Locomotive Scroll instance.
 * `progress` is the current scroll progress, updated on every scroll event.
 */

const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const scrollEl: HTMLElement | null =
      document.querySelector(locoScrollerClass);
    if (!scrollEl) return;

    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
    });
    setLocoScroll(locoScrollInstance);

    locoScrollInstance.on("scroll", ScrollTrigger.update);
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScrollInstance) {
          return arguments.length
            ? locoScrollInstance.scrollTo(value, 0)
            : locoScrollInstance.scroll.instance.scroll.y;
        }
        return null;
      },

      scrollLeft(value) {
        if (locoScrollInstance) {
          return arguments.length
            ? locoScrollInstance.scrollTo(value, 0, 0)
            : locoScrollInstance.scroll.instance.scroll.x;
        }
        return null;
      },

      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },

      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });
    const lsUpdate = () => {
      if (locoScrollInstance) {
        locoScrollInstance.update();
      }
    };
    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      if (locoScrollInstance) {
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScrollInstance.destroy();
      }
    };
  }, []);

  return {
    locoScroll,
    progress,
  };
};
export default useLocoScroll;
