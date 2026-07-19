import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import type { CognitiveApp } from '../types';
import { AppCard } from '../components/AppCard';
import { FilterPanel } from '../components/FilterPanel';
import { filterCatalog } from '../utils/filterCatalog';
import type { FilterState } from '../utils/filterCatalog';
import { sortCatalog } from '../utils/sortCatalog';
import type { SortOption } from '../utils/sortCatalog';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name (A → Z)' },
  { value: 'name-desc', label: 'Name (Z → A)' },
  { value: 'date-newest', label: 'Recently Updated' },
  { value: 'date-oldest', label: 'Oldest First' },
];

interface HomeViewProps {
  catalog: CognitiveApp[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
}

const DEFAULT_FILTERS: FilterState = {
  type: [],
  skills: [],
  difficulty: [],
  age: [],
  showFavoritesOnly: false,
};

export const HomeView: React.FC<HomeViewProps> = ({
  catalog,
  favorites,
  toggleFavorite,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) => {
  const { skill, type } = useParams<{ skill?: string; type?: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    showFavoritesOnly,
  });
  const [sortOption, setSortOption] = useState<SortOption>('date-newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync favorites only toggle from props
  useEffect(() => {
    setFilters((prev) => ({ ...prev, showFavoritesOnly }));
  }, [showFavoritesOnly]);

  // Handle URL route filtering (e.g. /skills/:skill, /type/:type)
  useEffect(() => {
    const updatedFilters = { ...DEFAULT_FILTERS, showFavoritesOnly };

    if (skill) {
      // Find case-insensitive match for the skill
      const matchedSkill = catalog
        .flatMap((app) => app.tags.skills)
        .find((s) => s.toLowerCase() === skill.toLowerCase());
      if (matchedSkill) {
        updatedFilters.skills = [matchedSkill];
      }
    }

    if (type) {
      // Find case-insensitive match for the type
      const matchedType = catalog
        .flatMap((app) => app.tags.type)
        .find((t) => t.toLowerCase() === type.toLowerCase());
      if (matchedType) {
        updatedFilters.type = [matchedType];
      }
    }

    setFilters(updatedFilters);
    setSearchQuery('');
  }, [skill, type, catalog, showFavoritesOnly]);

  const handleFilterChange = (nextFilters: FilterState) => {
    setFilters(nextFilters);
    if (nextFilters.showFavoritesOnly !== showFavoritesOnly) {
      setShowFavoritesOnly(nextFilters.showFavoritesOnly);
    }
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, showFavoritesOnly: false });
    setShowFavoritesOnly(false);
    setSearchQuery('');
    setSortOption('date-newest');
  };

  // Filtered and sorted applications
  const filteredApps = useMemo(() => {
    const filtered = filterCatalog(catalog, filters, searchQuery, favorites);
    return sortCatalog(filtered, sortOption);
  }, [catalog, filters, searchQuery, favorites, sortOption]);

  // Dynamic Page Title & H1 based on route parameters
  const pageDetails = useMemo(() => {
    if (skill) {
      const formatted = skill.charAt(0).toUpperCase() + skill.slice(1);
      return {
        title: `Cognitive ${formatted} Apps & Exercises | MindFlex`,
        h1: `${formatted} Challenges & Exercises`,
        description: `Explore all cognitive brain training applications designed to challenge and improve your ${skill} skills.`,
      };
    }
    if (type) {
      const formatted = type.charAt(0).toUpperCase() + type.slice(1);
      return {
        title: `Cognitive ${formatted} Applications | MindFlex`,
        h1: `${formatted} App Directory`,
        description: `Discover user-friendly cognitive ${type} applications, puzzles, and interactive exercises.`,
      };
    }
    if (showFavoritesOnly) {
      return {
        title: 'My Bookmarked Favorites | MindFlex',
        h1: 'My Bookmarked Favorites',
        description: 'Access your saved cognitive training tools and games directly in your local browser.',
      };
    }
    return {
      title: 'MindFlex | Cognitive Training Apps & Games Aggregator',
      h1: 'Human Intelligence, Augmented for Tomorrow',
      description: 'A curated directory of classic cognitive training tools, puzzles, and interactive educational games designed to challenge your mind and sharpen your skills.',
    };
  }, [skill, type, showFavoritesOnly]);

  return (
    <div className="pt-24 min-h-screen bg-warm-bg-light dark:bg-warm-bg-dark text-warm-text-light dark:text-warm-text-dark transition-colors duration-300">
      <Helmet>
        <title>{pageDetails.title}</title>
        <meta name="description" content={pageDetails.description} />
      </Helmet>

      {/* Hero Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="hero-glow animate-pulse-slow"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 border border-warm-accent-light/20 dark:border-warm-accent-dark/20 text-warm-accent-light dark:text-warm-accent-dark text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-warm-accent-light dark:bg-warm-accent-dark mr-2 animate-pulse"></span>
            Sharpen Your Mind in the AI Era
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            {pageDetails.h1}
          </h1>
          <p className="text-lg text-warm-muted-light dark:text-warm-muted-dark max-w-2xl mx-auto leading-relaxed">
            {pageDetails.description}
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {/* Mobile Filter Trigger & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Box */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-warm-muted-light/60 dark:text-warm-muted-dark/60">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              maxLength={100}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cognitive apps (e.g. Memory, logic, math)..."
              className="w-full pl-12 pr-12 py-3.5 bg-warm-surface-light/50 dark:bg-warm-surface-dark/50 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-full text-warm-text-light dark:text-warm-text-dark placeholder-warm-muted-light/60 dark:placeholder-warm-muted-dark/60 focus:outline-none focus:border-warm-accent-light dark:focus:border-warm-accent-dark transition-all"
              aria-label="Search apps"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-warm-muted-light/60 dark:text-warm-muted-dark/60 hover:text-warm-text-light dark:hover:text-warm-text-dark"
                aria-label="Clear search query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-warm-muted-light/60 dark:text-warm-muted-dark/60">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none pl-10 pr-10 py-3.5 bg-warm-surface-light/50 dark:bg-warm-surface-dark/50 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-full text-sm text-warm-text-light dark:text-warm-text-dark focus:outline-none focus:border-warm-accent-light dark:focus:border-warm-accent-dark transition-all cursor-pointer"
              aria-label="Sort apps"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-warm-muted-light/60 dark:text-warm-muted-dark/60">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center justify-center space-x-2 px-6 py-3.5 border border-warm-border-light dark:border-warm-border-dark text-warm-text-light dark:text-warm-text-dark rounded-full hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark transition-all"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filter Panel (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Cards Directory Grid */}
          <div className="lg:col-span-3">
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <div key={app.id}>
                    <AppCard
                      app={app}
                      isFavorite={favorites.includes(app.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State view */
              <div className="text-center py-20 px-4 bg-warm-surface-light/20 dark:bg-warm-surface-dark/20 border border-warm-border-light/20 dark:border-warm-border-dark/20 rounded-3xl max-w-xl mx-auto flex flex-col items-center">
                <SlidersHorizontal className="w-16 h-16 text-warm-muted-light/40 dark:text-warm-muted-dark/40 mb-4 stroke-[1.2]" />
                <h3 className="text-xl font-bold text-warm-text-light dark:text-warm-text-dark mb-2">
                  No results found matching your criteria
                </h3>
                <p className="text-warm-muted-light dark:text-warm-muted-dark text-sm leading-relaxed mb-6">
                  {showFavoritesOnly && favorites.length === 0
                    ? "You haven't saved any apps yet! Browse the directory and click the heart icon to save."
                    : "Try adjusting your search query or reset the filter tags to discover more tools."}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-warm-accent-light dark:bg-warm-accent-dark text-white dark:text-warm-bg-dark font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Drawer Filter Panel */}
      {mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          className="fixed inset-0 z-[100] lg:hidden bg-black/60 backdrop-blur-sm flex justify-end"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 h-full overflow-y-auto bg-warm-bg-light dark:bg-warm-bg-dark border-l border-warm-border-light/20 dark:border-warm-border-dark/20 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="p-1 rounded-full text-warm-muted-light dark:text-warm-muted-dark hover:text-warm-text-light dark:hover:text-warm-text-dark"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
