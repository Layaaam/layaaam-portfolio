import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  href?: string;
  download?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  onClick,
  href,
  download,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-4 text-base gap-3",
    lg: "px-8 py-5 text-lg gap-4",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-2 border-green-500 hover:shadow-lg hover:shadow-green-500/50 text-white",
    secondary:
      "backdrop-blur-sm bg-white/5 hover:bg-white/10 border-2 border-white/30 hover:border-white/50 text-white",
    ghost:
      "text-white hover:bg-white/10 border-2 border-transparent hover:border-white/50",
    light:
      "bg-white hover:bg-neutral-100 border-2 border-white hover:shadow-lg hover:shadow-black/10 text-black",
  };

  const iconStyles = "transition-transform";
  const iconAnimation =
    iconPosition === "right"
      ? "group-hover:translate-x-1"
      : "group-hover:-translate-x-1";

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className={`${iconStyles} ${iconAnimation}`}>{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className={`${iconStyles} ${iconAnimation}`}>{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={combinedClassName}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {content}
    </button>
  );
}