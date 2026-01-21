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
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none transition-all duration-200
          focus:ring-2 focus:ring-blue-100 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500
          placeholder:text-gray-400 text-sm
          ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
