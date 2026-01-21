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
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
        <div className="flex items-center">
          <div className="p-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-gray-500">
            <Linkedin size={18} />
          </div>
          <input
            type="url"
            value={values.linkedin || ""}
            onChange={(e) => onChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/..."
            className="flex-1 p-2.5 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none block w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
        <div className="flex items-center">
          <div className="p-2.5 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-gray-500">
            <Github size={18} />
          </div>
          <input
            type="url"
            value={values.github || ""}
            onChange={(e) => onChange("github", e.target.value)}
            placeholder="github.com/..."
            className="flex-1 p-2.5 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none block w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
