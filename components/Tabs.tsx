import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-neutral-700 mb-12">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`${
              activeTab === tab
                ? 'border-green-500 text-green-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 focus:outline-none`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;