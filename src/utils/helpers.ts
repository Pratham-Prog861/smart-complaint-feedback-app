import { ComplaintCategory } from '../types';

export const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  'Infrastructure',
  'Cleanliness',
  'Faculty',
  'IT',
  'Library',
  'Security',
  'General',
];

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    Infrastructure: 'purple',
    Cleanliness: 'teal',
    Faculty: 'indigo',
    IT: 'cyan',
    Library: 'pink',
    Security: 'red',
    General: 'gray',
  };
  return colors[category] || 'gray';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
