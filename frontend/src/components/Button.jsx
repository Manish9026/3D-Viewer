import React from "react";
import { cn } from "../utils/classFunctions";
// import { cn } from "../utils/classFunctions"; // utility to merge Tailwind classNames (optional)

// import PropTypes from "prop-types"; // optional, for prop type validation
const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-400 text-white hover:bg-gray-700",
  ghost: "text-white hover:bg-gray-700",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
  icon:"p-2 text-lg",
};

 const Button = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-md flex-1 transition-all text-center flex flex-col justify-center items-center cursor-pointer duration-200 font-medium focus:outline-none tansition-all duration-700 active:scale-95 will-change-transform",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
export { Button };