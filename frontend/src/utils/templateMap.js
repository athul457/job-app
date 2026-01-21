import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';

// Map of template IDs to Components
export const templateMap = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
};

// List for selection UI
export const templatesList = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A colorful, sidebar-based layout perfect for tech and creative roles.',
    thumbnailColor: 'bg-gray-800', // Just a placeholder for visual identification
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, traditional layout suitable for corporate and management roles.',
    thumbnailColor: 'bg-blue-100',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A typography-focused layout that puts your content first.',
    thumbnailColor: 'bg-white border',
  },
];
