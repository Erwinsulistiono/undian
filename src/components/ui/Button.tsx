import React from "react";

export type buttonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

interface ButtonProps {
  children: string;
  onClick: () => void;
  color?: buttonColor;
  size?: "small" | "large" | "normal";
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = "primary",
  size = "normal",
  disabled,
  outline,
}) => {
  const colorClassMap: { [key: string]: string } = {
    primary: "bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300",
    secondary: "bg-gray-500 text-gray-200 hover:bg-gray-700 duration-300",
    success: "bg-green-700 text-green-200 hover:bg-green-800 duration-300",
    danger: "bg-red-600 text-red-200 hover:bg-red-700 duration-300",
    warning: "bg-yellow-500 hover:bg-yellow-600 duration-300",
  };

  const outlineColorClassMap: { [key: string]: string } = {
    primary:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300",
    secondary:
      "border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-gray-100 duration-300",
    success:
      "border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300",
    danger:
      "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300",
    warning:
      "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-100 duration-300",
  };

  const buttonColor = colorClassMap[color] || colorClassMap["primary"];
  const buttonOutlineColor =
    outlineColorClassMap[color] || outlineColorClassMap["primary"];

  let buttonSize = "";
  if (size === "small") {
    buttonSize = "text-xs";
  } else if (size === "large") {
    buttonSize = "text-xl";
  }

  return (
    <button
      className={`rounded-lg px-4 py-2 font-bold ${
        outline ? buttonOutlineColor : buttonColor
      } ${buttonSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
