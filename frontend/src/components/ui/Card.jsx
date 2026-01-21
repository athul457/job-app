export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        bg-[#1E1E2D] border border-white/5 rounded-2xl shadow-xl 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
