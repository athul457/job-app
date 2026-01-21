const Card = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`
        bg-white border border-gray-100 rounded-2xl shadow-soft p-6 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
