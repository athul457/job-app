
import { Plus, X, Trash2 } from "lucide-react";

const ListInput = ({ title, items, onItemChange, onItemAdd, onItemRemove, placeholder }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-gray-100 pb-2">
         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onItemChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => onItemRemove(index)}
            className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove Item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      <button
        onClick={onItemAdd}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
      >
        <Plus size={16} /> Add {title.slice(0, -1)}
      </button>
    </div>
  );
};

export default ListInput;
