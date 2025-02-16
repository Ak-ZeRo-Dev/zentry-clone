import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { locoScrollerClass } from "../constants/constants";

const content = [
  ...Array(6).fill("our partners"),
  "binance labs",
  "coinbase ventures",
  "pantera capital",
  "defiance capital",
];

const Partners = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(
        "#partners-container p",
      ) as HTMLElement[];

      if (!texts) return;

      const containerAnimation = gsap
        .timeline({ paused: true })
        .to("#partners-container", {
          y: "-35vh",
        });

      ScrollTrigger.create({
        scroller: locoScrollerClass,
        trigger: "#partners",
        start: "top top",
        pin: true,
        animation: containerAnimation,
        pinSpacing: true,
        scrub: 1,
      });

      const textAnimation = gsap.timeline({ paused: true }).to(texts, {
        stagger: 0.1,
        duration: 0,
        color: "#edff66",
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        scroller: locoScrollerClass,
        trigger: "#partners-container",
        start: "top top",
        animation: textAnimation,
        scrub: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partners"
      className="section grid place-content-center !bg-black pt-32"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-28">
        <p className="text-violet-50" id="text">
          <span className="font-black">Our brand partners</span> cover tech,{" "}
          <br /> gaming, entertainment, & lifestyle <br /> sectors, enhancing
          our reach and <br /> player experience.
        </p>

        <div id="partners-container" className="flex flex-col gap-2">
          {content.map((item, index) => (
            <p
              key={index}
              className="font-general text-7xl font-bold text-violet-50 uppercase"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Partners;
