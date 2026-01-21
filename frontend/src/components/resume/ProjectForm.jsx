import { Trash2, Plus } from "lucide-react";

/**
 * ProjectForm Component
 * Manages a list of project entries with add/remove functionality.
 * Props:
 * - projects: Array of project objects
 * - onChange: Function(index, field, value)
 * - onAdd: Function()
 * - onRemove: Function(index)
 */
const ProjectForm = ({ projects = [], onChange, onAdd, onRemove }) => {
  return (
  
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-100">Projects</h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-gray-500 italic">No projects added yet.</p>
      )}

      {projects.map((project, index) => (
        <div key={index} className="p-4 bg-[#151521] rounded-lg border border-white/5 relative">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
            title="Remove Project"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Project Title</label>
              <input
                type="text"
                value={project.title || ""}
                onChange={(e) => onChange(index, "title", e.target.value)}
                placeholder="Portfolio Website"
                className="w-full p-2 bg-[#1E1E2D] border border-white/5 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none block text-white placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Tech Stack</label>
              <input
                type="text"
                value={project.techStack || ""}
                onChange={(e) => onChange(index, "techStack", e.target.value)}
                placeholder="React, Node.js"
                className="w-full p-2 bg-[#1E1E2D] border border-white/5 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none block text-white placeholder-gray-600"
              />
            </div>
          </div>

          <div className="mb-4">
             <label className="block text-xs font-medium text-gray-400 mb-1">Project Link (Optional)</label>
             <input
                type="url"
                value={project.link || ""}
                onChange={(e) => onChange(index, "link", e.target.value)}
                placeholder="https://github.com/..."
                className="w-full p-2 bg-[#1E1E2D] border border-white/5 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none block text-white placeholder-gray-600"
              />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <textarea
              value={project.description || ""}
              onChange={(e) => onChange(index, "description", e.target.value)}
              placeholder="Describe the project key features..."
              className="w-full p-2 bg-[#1E1E2D] border border-white/5 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-20 text-white placeholder-gray-600"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectForm;
