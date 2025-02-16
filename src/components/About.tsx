import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const About = () => {
  return (
    <section className="section grid place-content-center gap-10 pb-10">
      <p className="font-general pb-5 text-center text-xs tracking-widest">
        who we are
      </p>
      <AnimatedTitle
        text="we're building<br/>a new reality <br/>that rewards<br/>players and<br/>encourages<br/>communities<br/>to thrive"
        className="!text-black"
      />

      <p className="text-center">
        Zentry is on a mission to unite diverse player networks to forge the
        world's largest shared adventure.
      </p>

      <Button className="mx-auto mt-5 w-fit !bg-black text-violet-50 uppercase">
        discover who we are
      </Button>
    </section>
  );
};
export default About;
