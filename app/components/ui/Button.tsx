import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  href,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "flex items-center gap-2 px-5 py-2 text-xs font-extrabold tracking-wider transition-colors rounded";

  const variantStyles = {
    primary: "text-black bg-white hover:bg-white/90",
    secondary: "text-white bg-white/10 hover:bg-white/20",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
