import { FaGithub, FaLinkedin, FaUpwork } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const links = [
  {
    name: "gmail",
    url: "mailto:abdulrahman.mahmoud.alkurdi@gmail.com",
    icon: <SiGmail />,
  },
  {
    name: "github",
    url: "https://github.com/Ak-ZeRo-Dev",
    icon: <FaGithub />,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/ak-zero",
    icon: <FaLinkedin />,
  },
  {
    name: "upwork",
    url: "https://www.upwork.com/freelancers/~01b43b0a08fe7e1b4d",
    icon: <FaUpwork />,
  },
];

const Footer = () => {
  const date = new Date();

  return (
    <footer className="flex w-full flex-wrap justify-between rounded-s-lg border border-gray-400 p-5 drop-shadow-2xl max-md:flex-col">
      <div>
        <p className="text-sm capitalize">
          created by abdulrahman alkurdi - {date.getFullYear()}
        </p>
      </div>

      <ul className="flex gap-4">
        {links.map(({ name, url, icon }) => (
          <li
            key={name}
            className="text-3xl transition-colors hover:text-violet-300"
          >
            <a href={url} target="_blank" rel="noreferrer">
              {icon}
            </a>
          </li>
        ))}
      </ul>

      <div>
        <p className="text-sm capitalize">
          this website is clone of{" "}
          <a
            href="https://zentry.com/"
            className="font-black underline transition-colors hover:text-violet-300"
          >
            zentry
          </a>{" "}
          created for learning purpose.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
