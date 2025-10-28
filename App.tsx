import React, { useState, useMemo, useEffect } from 'react';
import { ARCHITECTURE_DATA } from './constants/keywords';
import KeywordPill from './components/KeywordPill';
import Tabs from './components/Tabs';
import SidebarNav from './components/SidebarNav';

const BlueprintIcon = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-500"
    >
      <path d="M21.5 12H18l-3 6-3-12-3 6H2.5" />
      <path d="M14 6V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
      <path d="M14 12v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
    </svg>
);

const App: React.FC = () => {
  const tabLabels = useMemo(() => ARCHITECTURE_DATA.map(d => d.collectionTitle), []);
  const [activeTab, setActiveTab] = useState<string>(tabLabels[0]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCollection = useMemo(() => {
    return ARCHITECTURE_DATA.find(collection => collection.collectionTitle === activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    if (activeCollection && activeCollection.categories.length > 0) {
      const firstCategory = activeCollection.categories[0].title;
      setActiveCategory(firstCategory);
      setSearchQuery(''); // Reset search when tab changes
    } else {
      setActiveCategory(null);
    }
  }, [activeCollection]);
  
  const handleCategoryClick = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    setSearchQuery(''); // Reset search when category changes
  };

  const activeCategoryData = useMemo(() => {
    return activeCollection?.categories.find(cat => cat.title === activeCategory);
  }, [activeCollection, activeCategory]);

  const filteredKeywords = useMemo(() => {
    if (!activeCategoryData) return [];
    if (!searchQuery) return activeCategoryData.keywords;

    return activeCategoryData.keywords.filter(keyword =>
      keyword.term.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategoryData, searchQuery]);


  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center gap-4 mb-4">
            <BlueprintIcon />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-100 tracking-tight text-gradient">
              Arch-Interior Wiki
            </h1>
          </div>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Kamus lengkap untuk istilah Arsitektur & Desain Interior.
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Pilih kategori di samping, lalu arahkan kursor atau klik istilah untuk menyalinnya.
          </p>
        </header>

        <main>
          <Tabs 
            tabs={tabLabels}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <SidebarNav
              categories={activeCollection?.categories || []}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
            <div className="flex-1 w-full">
              {activeCategoryData ? (
                <section id="content" className="bg-neutral-800 rounded-xl border border-neutral-700">
                  <div className="p-6 border-b border-neutral-700">
                    <h2 className="text-2xl font-bold text-green-400">{activeCategoryData.title}</h2>
                  </div>
                  <div className="p-6">
                    <div className="relative mb-6">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                         </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Cari kata kunci..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-700/50 border border-neutral-600 rounded-lg py-2 pl-10 pr-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      />
                    </div>

                    {filteredKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {filteredKeywords.map((keyword) => (
                            <KeywordPill
                                key={keyword.term}
                                term={keyword.term}
                                explanation={keyword.explanation}
                                isLoading={false}
                                onHover={() => {}}
                            />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-neutral-400 py-8">Tidak ada kata kunci yang cocok dengan pencarian Anda.</p>
                    )}
                  </div>
                </section>
              ) : (
                <p className="text-center text-neutral-400">Pilih sebuah kategori untuk memulai.</p>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center mt-24 py-8 border-t border-neutral-700">
            <p className="text-neutral-500">Powered by React</p>
        </footer>
      </div>
    </div>
  );
};

export default App;