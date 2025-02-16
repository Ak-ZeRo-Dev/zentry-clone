import gsap from "gsap";
import { useEffect, useRef } from "react";
import { locoScrollerClass } from "../constants/constants";
import { cn } from "../utils/utils";

type Props = {
  text: string;
  className?: string;
  textClassName?: string;
};

const AnimatedTitle = ({ text, className, textClassName = "" }: Props) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            scroller: locoScrollerClass,
            toggleActions: "play none none reverse",
          },
        })
        .to(containerRef.current.querySelectorAll(".animated-word"), {
          opacity: 1,
          transform: "rotate(0) translate3d(0, 0, 0)",
          stagger: 0.05,
          ease: "power2.out",
        });
    });

    return () => ctx.revert();
  }, []);
  return (
    <h2 ref={containerRef} className={cn("animated-title", className)}>
      {text.split("<br/>").map((line, index) => (
        <div
          key={index}
          className={cn(
            "flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3",
            textClassName && textClassName,
          )}
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </h2>
  );
};

export default AnimatedTitle;
