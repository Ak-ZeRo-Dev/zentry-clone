import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className = "", children, ...props }: Props) => {
  return (
    <button className={`primary-btn ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
