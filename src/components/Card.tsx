import { ReactNode, useRef } from "react";

type Props = {
  video: string;
  title: ReactNode;
  description: string;
};
const Card = ({ video, title, description }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      className="relative h-96 w-full cursor-pointer overflow-hidden rounded-xl border border-white/30 md:min-h-[55vh] lg:h-full"
    >
      <div className="absolute size-full">
        <video
          ref={videoRef}
          src={video}
          loop
          muted
          className="size-full object-cover"
        />
      </div>

      <div className="text-blue-75 relative z-10 flex flex-col gap-2 px-5 py-2.5">
        <h3 className="grid-title">{title}</h3>
        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
      </div>
    </div>
  );
};
export default Card;
