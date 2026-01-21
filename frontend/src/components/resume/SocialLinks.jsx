import { Linkedin, Github } from "lucide-react";

/**
 * SocialLinks Component
 * Inputs for LinkedIn and GitHub URLs.
 * Props:
 * - values: Object containing { linkedin, github }
 * - onChange: Function(field, value)
 */
const SocialLinks = ({ values, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
        <div className="flex items-center">
          <div className="p-2.5 bg-[#1E1E2D] border border-r-0 border-white/5 rounded-l-lg text-gray-500">
            <Linkedin size={18} />
          </div>
          <input
            type="url"
            value={values.linkedin || ""}
            onChange={(e) => onChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/..."
            className="flex-1 p-2.5 bg-[#151521] border border-white/5 rounded-r-lg focus:ring-2 focus:ring-indigo-500 outline-none block w-full text-white placeholder-gray-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
        <div className="flex items-center">
          <div className="p-2.5 bg-[#1E1E2D] border border-r-0 border-white/5 rounded-l-lg text-gray-500">
            <Github size={18} />
          </div>
          <input
            type="url"
            value={values.github || ""}
            onChange={(e) => onChange("github", e.target.value)}
            placeholder="github.com/..."
            className="flex-1 p-2.5 bg-[#151521] border border-white/5 rounded-r-lg focus:ring-2 focus:ring-indigo-500 outline-none block w-full text-white placeholder-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
