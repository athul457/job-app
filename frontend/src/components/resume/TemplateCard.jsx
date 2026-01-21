import { Check } from "lucide-react";

/**
 * TemplateCard Component
 * Displays a resume template option.
 * 
 * Props:
 * - name: string (Template name)
 * - selected: boolean (Is currently selected)
 * - onSelect: function (Handler)
 * - image: string (Placeholder image URL)
 */
const TemplateCard = ({ name, description, selected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(name)}
      className={`relative cursor-pointer group rounded-xl border-2 transition-all overflow-hidden ${
        selected 
          ? "border-indigo-500 ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/20" 
          : "border-white/5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
      }`}
    >
      {/* Selection Badge */}
      {selected && (
        <div className="absolute top-3 right-3 z-10 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg shadow-indigo-500/40">
          <Check size={16} strokeWidth={3} />
        </div>
      )}

      {/* Placeholder Preview */}
      <div className={`h-48 bg-[#151521] flex items-center justify-center border-b border-white/5 ${
        selected ? "bg-indigo-500/5" : ""
      }`}>
        <div className="text-center p-4 w-full">
           {/* Abstract Skeleton UI Representation */}
           <div className="w-24 h-2 bg-white/10 rounded-full mx-auto mb-3"></div>
           <div className="w-32 h-2 bg-white/10 rounded-full mx-auto mb-8"></div>
           <div className="space-y-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full max-w-[140px] mx-auto"></div>
              <div className="w-full h-1.5 bg-white/10 rounded-full max-w-[120px] mx-auto"></div>
              <div className="w-full h-1.5 bg-white/10 rounded-full max-w-[130px] mx-auto"></div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-[#1E1E2D]">
        <h3 className={`font-bold text-lg mb-1 ${selected ? 'text-indigo-400' : 'text-gray-200'}`}>
          {name}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
