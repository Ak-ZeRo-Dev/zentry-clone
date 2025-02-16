import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ContactUs = () => {
  return (
    <section className="relative min-h-[70dvh] bg-blue-50">
      <div className="position-center h-[60dvh] w-[95%] overflow-hidden rounded-lg bg-black">
        <div className="position-center space-y-10">
          <p className="font-general pb-5 text-center text-xs tracking-widest text-violet-50 uppercase">
            join zentry
          </p>
          <AnimatedTitle
            text="let's build the <br/>new era of<br/>gaming together."
            className="!text-5xl"
          />

          <Button className="mx-auto !bg-violet-50">contact us</Button>
        </div>

        <img
          loading="lazy"
          src="/public/img/swordman.webp"
          alt="contact image 1"
          className="contact-img-1"
        />
        <img
          loading="lazy"
          src="/public/img/contact-1.webp"
          alt="contact image 2"
          className="contact-img-2"
        />
        <img
          loading="lazy"
          src="/public/img/contact-2.webp"
          alt="contact image 2"
          className="contact-img-3"
        />
      </div>
    </section>
  );
};
export default ContactUs;
