import React from 'react';
import type { Category } from '../types';

interface SidebarNavProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryClick: (title: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <aside className="lg:w-64 lg:flex-shrink-0">
      <nav className="sidebar-nav lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Kategori</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.title}
              onClick={() => onCategoryClick(category.title)}
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                activeCategory === category.title
                  ? 'bg-neutral-700 text-green-400'
                  : 'text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-100'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;