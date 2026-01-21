import { useState } from "react";
import { Plus, X } from "lucide-react";

/**
 * SkillInput Component
 * Allows users to add skills which are displayed as removable tags.
 * Props:
 * - skills: Array of strings
 * - onAdd: Function(skillString)
 * - onRemove: Function(skillString)
 */
const SkillInput = ({ skills = [], onAdd, onRemove }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      onAdd(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Skills</label>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Node.js, Leadership"
          className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span 
            key={skill} 
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;
