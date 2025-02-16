import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { TiLocation } from "react-icons/ti";
import { locoScrollerClass } from "../constants/constants";
import { cn } from "../utils/utils";
import Button from "./Button";
import Loading from "./Loading";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeOutRef = useRef<any>(null);

  const [currIndex, setCurrIndex] = useState<number>(0);
  const [loadedVideos, setLoadedVideos] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const totalVideos = 4;
  const nextIndex = (currIndex + 1) % totalVideos;

  const handleNext = () => {
    setCurrIndex(nextIndex);

    const nextVideo = document.querySelector(
      `#video-${nextIndex}`,
    ) as HTMLVideoElement;

    const videos = ["#video-0", "#video-1", "#video-2", "#video-3"];

    videos.forEach((video) => {
      if (video !== `#video-${nextIndex}` && video !== `#video-${currIndex}`) {
        const ele = document.querySelector(video) as HTMLVideoElement;
        if (ele) ele.pause();
      }
    });

    if (!nextVideo) return;

    gsap.set(nextVideo, {
      width: "16rem",
      height: "16rem",
    });

    nextVideo.pause();
    nextVideo.currentTime = 0;
    nextVideo.play();

    gsap.to(nextVideo, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      width: "100%",
      height: "100%",
      duration: 1.2,
    });
  };

  useEffect(() => {
    if (loadedVideos !== totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);

  const handleMouseEvent = useCallback((e: MouseEvent) => {
    if (!backgroundVideo.current) return;

    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      gsap.to(backgroundVideo.current, {
        autoAlpha: 0,
        duration: 0.5,
      });
    }, 2000);

    gsap.to(backgroundVideo.current, {
      autoAlpha: 1,
      duration: 0.5,
    });

    const { clientX, clientY } = e;

    const maxOffsetX = 593;
    const maxOffsetY = 253;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const constrainedX = Math.min(
      Math.max(clientX, centerX - maxOffsetX),
      centerX + maxOffsetX,
    );
    const constrainedY = Math.min(
      Math.max(clientY, centerY - maxOffsetY),
      centerY + maxOffsetY,
    );

    const polygonClipPath = `polygon(
      ${Math.max(constrainedX - 100, 0)}px ${Math.max(constrainedY - 100, 0)}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.max(constrainedY - 100, 0)}px,
      ${Math.min(constrainedX + 100, window.innerWidth)}px ${Math.min(constrainedY + 100, window.innerHeight)}px,
      ${Math.max(constrainedX - 100, 0)}px ${Math.min(constrainedY + 100, window.innerHeight)}px
    )`;

    gsap.to(backgroundVideo.current, {
      clipPath: polygonClipPath,
      duration: 0,
    });
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    hero.addEventListener("mousemove", handleMouseEvent);

    return () => hero.removeEventListener("mousemove", handleMouseEvent);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const videoId = "#video-frame";
      gsap.set(videoId, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      });

      gsap.to(videoId, {
        clipPath: "polygon(25% 0, 75% 0, 90% 100%, 10% 100%)",
        scrollTrigger: {
          trigger: videoId,
          start: "center 40%",
          end: "bottom center",
          scrub: true,
          scroller: locoScrollerClass,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="section bg-blue-50 select-none">
      {isLoading && <Loading />}
      <div id="video-frame" className="relative z-20 h-dvh overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={backgroundVideo}
            onClick={handleNext}
            className="invisible absolute z-20 cursor-pointer object-cover"
            src={`/videos/hero-${nextIndex}.mp4`}
            autoPlay
            muted
            loop
          />

          {Array.from({ length: totalVideos }).map((_, index) => (
            <video
              key={index}
              id={`video-${index}`}
              className={cn(
                "position-center h-full w-full object-cover",
                index === currIndex ? "z-10" : "z-0",
              )}
              src={`/videos/hero-${index}.mp4`}
              autoPlay
              muted
              loop
              onLoadedData={() => setLoadedVideos((prev) => prev + 1)}
            />
          ))}
        </div>

        <div className="absolute top-20 left-5 z-30 flex flex-col items-start gap-3 pl-5 sm:left-10">
          <h2 className="hero-heading">
            redifi<b>n</b>
          </h2>

          <p className="font-robert-regular text-blue-75 mb-5 max-w-64 uppercase">
            enter the metagame layer
            <br />
            unleash the play economy
          </p>

          <Button>
            <TiLocation />
            <span className="font-general text-xs uppercase">
              Watch trailer
            </span>
          </Button>
        </div>

        <h1 className="hero-heading absolute right-5 bottom-5 z-20 sm:right-10">
          g<b className="special-font">a</b>ming
        </h1>
      </div>

      <h2 className="hero-heading absolute right-5 bottom-5 z-10 !text-black sm:right-10">
        g<b className="special-font">a</b>ming
      </h2>
    </section>
  );
};
export default Hero;
