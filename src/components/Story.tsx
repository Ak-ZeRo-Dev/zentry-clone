import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MouseEvent, useEffect, useRef } from "react";
import { locoScrollerClass } from "../constants/constants";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import RoundedCorners from "./RoundedCorners";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;

    const { top, left, width, height } =
      frameRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    const x = clientX - left;
    const y = clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateX = ((y - centerY) / centerY) * -30;
    const rotateY = ((x - centerX) / centerX) * 30;

    gsap.to(frameRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      perspective: 600,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    gsap.to(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          paused: true,
        })
        .from("#paragraph-story", {
          transform:
            "translate3d(0, 100px, 500px) rotateY(60deg) rotateX(-40deg)",
          transformOrigin: "50% 50% -50%",
          opacity: 0,
        })
        .from("#realm-btn", {
          opacity: 0,
          y: 100,
        });

      ScrollTrigger.create({
        trigger: "#paragraph-container",
        scroller: locoScrollerClass,
        start: "top 80%",
        animation: tl,
        toggleActions: "play none none reverse",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section !bg-black pb-24">
      <div className="flex flex-col justify-center gap-2">
        <span className="font-general text-center text-xs text-gray-500 lg:text-[10px]">
          THE MULTIVERSAL IP WORLD
        </span>
        <AnimatedTitle
          className="relative z-10 mix-blend-difference"
          text={"THE STORY OF <br/> THE HIDDEN REALM"}
        />
      </div>

      <div
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        <div className="flt h-[90vh] md:h-dvh">
          <div className="story-img-mask">
            <div className="story-img-content">
              <img ref={frameRef} src="/img/entrance.webp" alt="" />
            </div>
          </div>
          <RoundedCorners />
        </div>
      </div>

      <div
        id="paragraph-container"
        className="-mt-80 flex w-full justify-center px-5 md:me-44 md:-mt-64 md:justify-end"
      >
        <div className="flex h-full w-fit flex-col items-center md:items-start">
          <p
            id="paragraph-story"
            style={{ perspective: "600px" }}
            className="font-circular-web mt-3 max-w-sm text-center text-violet-50 md:text-start"
          >
            Where realms converge, lies Zentry and the boundless pillar.
            Discover its secrets and shape your fate amidst infinite
            opportunities.
          </p>
          <Button id="realm-btn" className="mt-5 !bg-violet-50 uppercase">
            <span>discover prologue</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Story;
