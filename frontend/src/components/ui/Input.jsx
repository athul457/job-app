import { forwardRef } from "react";

const Input = forwardRef(({ 
  label, 
  error, 
  className = "", 
  containerClassName = "",
  ...props 
}, ref) => {
  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 bg-[#151521] border border-white/5 rounded-xl outline-none transition-all duration-200
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white
          disabled:bg-white/5 disabled:text-gray-500 disabled:cursor-not-allowed
          placeholder:text-gray-600 text-sm
          ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
