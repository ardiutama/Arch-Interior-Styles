import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute bottom-full left-1/2 z-20 w-64 mb-3 px-3 py-2 text-sm font-medium text-neutral-200 transition-all duration-300 bg-neutral-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-neutral-600/50 opacity-0 group-hover:opacity-100 -translate-x-1/2 pointer-events-none transform scale-95 group-hover:scale-100 origin-bottom">
        {content}
        <div className="tooltip-arrow absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-neutral-800"></div>
      </div>
    </div>
  );
};

export default Tooltip;