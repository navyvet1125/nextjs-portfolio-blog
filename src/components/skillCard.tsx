import React from 'react';
import Image from 'next/image';

interface SkillCardProps {
    title: string;
    description?: string;
    svg: string; // This now expects a path to the SVG
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, svg }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-600 text-white">
      <Image src={svg} alt={title} className="w-16 h-16 mb-2" height={40} width={40}/> {/* Use img tag to display the SVG */}
      <h3 className="text-xl font-bold">{title}</h3>
      {description && <p className="text-sm mt-2">{description}</p>}
    </div>
  );
};

export default SkillCard;