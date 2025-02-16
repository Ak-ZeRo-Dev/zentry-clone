import { TiLocationArrow } from "react-icons/ti";
import Card from "./Card";
import TiltCard from "./TiltCard";

const Features = () => {
  return (
    <section className="bg-black px-5 pb-52">
      <div className="font-circular-web px-5 py-32 text-blue-50">
        <p className="text-lg">Dive into the 'Game of Games' Universe</p>
        <p className="max-w-md text-lg opacity-50">
          Immerse yourself in a rich and ever-expanding ecosystem where a
          vibrant array of products converge into an interconnected universe.
        </p>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-5 md:grid-rows-4">
        <div className="col-span-full row-span-1">
          <Card
            video="/videos/feature-1.mp4"
            title="radint"
            description="A cross-platform metagame app, turning your activities across web2 and web3 games into a rewarding adventure."
          />
        </div>

        <TiltCard className="col-span-full md:col-span-2 md:row-span-2">
          <Card
            video="/videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
          />
        </TiltCard>

        <TiltCard className="col-span-full row-span-1 max-md:ms-32 md:col-span-2">
          <Card
            video="/videos/feature-3.mp4"
            title={
              <>
                Ne<b>x</b>us
              </>
            }
            description="A gamified social hub . adding a new dimension of play interacting with your friends."
          />
        </TiltCard>

        <TiltCard className="col-span-full row-span-1 max-md:me-32 md:col-span-2">
          <Card
            video="/videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A gamified social hub . adding a new dimension of play interacting with your friends."
          />
        </TiltCard>

        <TiltCard className="grid-2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h2 className="grid-title max-w-64 text-black">
              <b>M</b>ore coming s<b>o</b>on!
            </h2>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </TiltCard>

        <TiltCard className="grid-2">
          <video
            src="/videos/feature-5.mp4"
            className="size-full object-cover object-center"
            loop
            muted
            autoPlay
          />
        </TiltCard>
      </div>
    </section>
  );
};
export default Features;
