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
          ? "border-blue-600 ring-4 ring-blue-50 shadow-md" 
          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      {/* Selection Badge */}
      {selected && (
        <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white p-1.5 rounded-full shadow-sm">
          <Check size={16} strokeWidth={3} />
        </div>
      )}

      {/* Placeholder Preview */}
      <div className={`h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100 ${
        selected ? "bg-blue-50/30" : ""
      }`}>
        <div className="text-center p-4">
           {/* Abstract Skeleton UI Representation */}
           <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto mb-3"></div>
           <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto mb-8"></div>
           <div className="space-y-2">
              <div className="w-full h-1.5 bg-gray-200 rounded-full max-w-[140px] mx-auto"></div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full max-w-[120px] mx-auto"></div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full max-w-[130px] mx-auto"></div>
           </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className={`font-bold text-lg mb-1 ${selected ? 'text-blue-700' : 'text-gray-800'}`}>
          {name}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
