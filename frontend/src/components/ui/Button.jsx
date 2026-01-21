import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-500/20 border border-transparent",
  secondary: "bg-[#151521] text-gray-300 border border-white/10 hover:bg-white/5 active:bg-white/10 shadow-sm",
  danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 active:bg-red-500/30",
  ghost: "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white active:bg-white/10",
  link: "bg-transparent text-indigo-400 hover:text-indigo-300 hover:underline p-0 h-auto px-0",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm font-medium",
  lg: "px-6 py-3 text-base font-medium",
  icon: "p-2",
};

const Button = forwardRef(({ 
  className = "", 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
