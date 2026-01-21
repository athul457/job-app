import { Trash2, Plus } from "lucide-react";

/**
 * EducationForm Component
 * Manages a list of education entries with add/remove functionality.
 * Props:
 * - education: Array of education objects
 * - onChange: Function(index, field, value)
 * - onAdd: Function()
 * - onRemove: Function(index)
 */
const EducationForm = ({ education = [], onChange, onAdd, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Education</h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-sm text-gray-500 italic">No education added yet.</p>
      )}

      {education.map((edu, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove Education"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree || ""}
                onChange={(e) => onChange(index, "degree", e.target.value)}
                placeholder="B.Sc. Computer Science"
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none block"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution || ""}
                onChange={(e) => onChange(index, "institution", e.target.value)}
                placeholder="University of Tech"
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Year</label>
              <input
                type="text"
                value={edu.startYear || ""}
                onChange={(e) => onChange(index, "startYear", e.target.value)}
                placeholder="2018"
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none block"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Year</label>
              <input
                type="text"
                value={edu.endYear || ""}
                onChange={(e) => onChange(index, "endYear", e.target.value)}
                placeholder="2022"
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none block"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
            <textarea
              value={edu.description || ""}
              onChange={(e) => onChange(index, "description", e.target.value)}
              placeholder="Major coursework, achievements..."
              className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
