import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { locoScrollerClass } from "../constants/constants";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import PaginationItem from "./PaginationItem";

const Pin = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoNum, setVideoNum] = useState<number>(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pagination") as HTMLElement[];
      const paragraphs = gsap.utils.toArray(".pagination p");
      const lineContainers = gsap.utils.toArray(".lineContainer");

      gsap.set(paragraphs, {
        opacity: 0,
        scaleY: 0,
        visibility: "hidden",
      });
      gsap.set(lineContainers, {
        opacity: 0,
        height: 0,
        visibility: "hidden",
      });

      let cumulativeOffset = 0;
      items.forEach((item: HTMLElement, index: number) => {
        if (!item) return;
        const lineContainer = lineContainers[index];
        const line = item.querySelector(".line");
        const paragraph = item.querySelector("p");
        const titles = gsap.utils.toArray(".pagination h4");
        const title = item.querySelector("h4");

        gsap.set(titles, {
          opacity: "60%",
        });

        const lineAnimation = gsap.timeline({ paused: true }).to(line, {
          y: 100,
        });

        const mainAnimation = gsap
          .timeline({ paused: true })
          .to(lineContainer as HTMLElement, {
            autoAlpha: 1,
            height: "6rem",
          })
          .to(paragraph, {
            autoAlpha: 1,
            scaleY: 1,
            duration: 0.2,
          })
          .to(title, {
            autoAlpha: 1,
            duration: 0.2,
          });

        const animationDuration = 1000;
        const start = `top+=${cumulativeOffset} center`;
        const end = `+=${animationDuration}`;

        ScrollTrigger.create({
          scroller: locoScrollerClass,
          trigger: item as HTMLElement,
          start,
          end,
          animation: lineAnimation,
          scrub: 1,

          onEnter: () => {
            mainAnimation.play();
            setVideoNum((prev) => (prev === 1 ? 2 : 1));
          },
          onEnterBack: () => {
            mainAnimation.play();
            setVideoNum((prev) => (prev === 1 ? 2 : 1));
          },
          onLeave: () => mainAnimation.reverse(),
          onLeaveBack: () => mainAnimation.reverse(),
        });

        cumulativeOffset += animationDuration;
      });

      //Btn Animation
      ScrollTrigger.create({
        scroller: locoScrollerClass,
        trigger: "#vault",
        start: "top bottom",
        animation: gsap.from("#vault", {
          opacity: 0,
          y: 100,
          duration: 0.3,
        }),
      });

      //Pin
      ScrollTrigger.create({
        scroller: locoScrollerClass,
        trigger: "#pin",
        start: "8% top",
        end: "+=3100 top",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <section id="pin" className="section !min-h-[113dvh] !bg-yellow-300">
      <div className="absolute inset-0 top-10 left-10 mt-20 flex flex-col gap-4 lg:mt-32">
        <AnimatedTitle
          text="the univers<b>e</b> <br/> powered by ze<b>n</b>t"
          className="!p-0 !text-start !text-black"
          textClassName="!justify-start !p-0"
        />
        <Button
          id="vault"
          className="mx-auto w-fit !bg-black !px-10 text-violet-50 lg:mx-0"
        >
          Enter Vault
        </Button>

        <div className="bottom-10 z-30 mx-auto size-52 md:size-96 lg:absolute lg:right-10">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            src={`/videos/v${videoNum}.webm`}
          />
        </div>

        <div className="mt-40 flex flex-col items-start pl-8 lg:mt-5">
          <PaginationItem
            num="01"
            text="Shaping Zentry Collectively"
            desc="Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations."
          />

          <PaginationItem
            num="02"
            text="Unlocking Economic Opportunity"
            desc="ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem."
          />

          <PaginationItem
            num="03"
            text="Sharing Value Accrued"
            desc="ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment, and economic activities."
          />
        </div>
      </div>
    </section>
  );
};
export default Pin;
