import gsap from "gsap";
import { useEffect } from "react";
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from "react-parallax-mouse";
import { locoScrollerClass } from "../constants/constants";
import AnimatedTitle from "./AnimatedTitle";

const AboutUs = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#clip-mask", {
        clipPath: "polygon(14% 0, 82% 16%, 80% 92%, 6% 89%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            scroller: locoScrollerClass,
            trigger: "#clip",
            start: "56% center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,

            onUpdate: (self) => {
              const { progress } = self;
              const clipPathValue = `
              polygon(
                ${gsap.utils.interpolate(14, 0, progress)}% 0%,
                ${gsap.utils.interpolate(82, 100, progress)}% 0%,
                ${gsap.utils.interpolate(80, 100, progress)}% 100%,
                ${gsap.utils.interpolate(6, 0, progress)}% 100%
              )
              `;

              gsap.to("#clip-mask", {
                clipPath: clipPathValue,
              });
            },
          },
        })
        .to("#clip-mask", {
          width: "100vw",
          height: "100vh",
        });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section className="section">
      <div className="mt-36 flex flex-col items-center gap-5">
        <p className="font-general pb-5 text-center text-xs tracking-widest">
          welcome to zentry
        </p>
        <AnimatedTitle
          className="!text-black"
          text={`DISC<b>O</b>VER THE WORLD'S LARGEST<br/>SHARED <b>A</b>DVENTURE`}
        />
      </div>

      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <MouseParallaxChild factorX={0.3} factorY={0.5}>
          <div id="clip" className="h-dvh w-screen">
            <div
              id="clip-mask"
              className="position-center-x z-10 mt-10 h-96 w-[30vw] overflow-hidden rounded-2xl border border-black"
            >
              <img
                src="/img/about.webp"
                alt="about"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="font-circular-web absolute bottom-52 left-1/2 w-full max-w-96 -translate-x-1/2 gap-3 text-center text-lg md:max-w-[34rem]">
              <p className="text-black">
                The Game Of Games Begins—Your Life, Now An Epic MMORPG
              </p>
              <p className="font-semibold text-gray-500">
                Zentry unites the every players from countless games and
                platforms, both digital and physical, into a unified Play
                Economy
              </p>
            </div>
          </div>
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </section>
  );
};
export default AboutUs;
