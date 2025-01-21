"use client";

import Icon from "../Icon";
import style from "./button.module.css";

const Button = ({
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  icon,
  children,
  className = "",
  type = "button",
}) => {
  const buttonStyle = `${style.button} ${style[variant]} ${style[size]} ${className}`;

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && (
        <span className={style.icon}>
          <Icon src={icon} alt={children} width={20} height={20} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
