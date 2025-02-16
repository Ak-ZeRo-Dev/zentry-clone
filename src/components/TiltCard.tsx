import { MouseEvent, ReactNode, useRef, useState } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const TiltCard = ({ className = "", children }: Props) => {
  const [transformValue, setTransformValue] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { top, left, width, height } =
      itemRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    const tiltX = (y - 0.5) * 15;
    const tiltY = (x - 0.5) * 15;

    const transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformValue(transform);
  };
  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformValue("")}
      className={className}
      style={{
        transform: transformValue,
        transition: "transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
