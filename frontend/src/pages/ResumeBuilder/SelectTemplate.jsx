import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templatesList, templateMap } from '../../utils/templateMap';
import { Check } from 'lucide-react';

const SelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('modern');

  // Dummy data for preview
  const dummyData = {
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@example.com',
      phone: '555-0123',
    },
    skills: ['React', 'Node.js', 'MongoDB'],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Developer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Building amazing apps.'
      }
    ]
  };

  const handleUseTemplate = () => {
    navigate(`/dashboard/create-resume?template=${selectedId}`);
  };

  const SelectedComponent = templateMap[selectedId];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] gap-6">
        {/* Sidebar Selection */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Choose a Template</h1>
          
          <div className="space-y-4">
            {templatesList.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={`cursor-pointer border-2 rounded-xl p-4 transition-all relative ${
                  selectedId === template.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-bold ${selectedId === template.id ? 'text-blue-700' : 'text-gray-900'}`}>{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>
                  {selectedId === template.id && (
                    <div className="bg-blue-600 rounded-full p-1 text-white shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <button
              onClick={handleUseTemplate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-full lg:w-2/3 bg-gray-100 rounded-xl border border-gray-200 p-8 overflow-hidden flex items-start justify-center relative">
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
            <div className="scale-[0.6] origin-top shadow-2xl border border-gray-300 bg-white">
              {SelectedComponent ? (
                <SelectedComponent data={dummyData} />
              ) : (
                <p>Select a template</p>
              )}
            </div>
        </div>
    </div>
  );
};

export default SelectTemplate;
