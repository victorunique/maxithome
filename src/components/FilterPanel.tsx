import React from 'react';
import type { FilterState } from '../utils/filterCatalog';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

const FILTER_OPTIONS = {
  type: ['Tool', 'Game', 'Learning', 'Assessment', 'Other'],
  skills: [
    'Memory',
    'Focus',
    'Attention',
    'Logic',
    'Reasoning',
    'Spatial',
    'Processing Speed',
    'Language',
    'Mathematics',
    'Creativity',
    'Executive Function',
    'Decision Making',
  ],
  difficulty: ['Beginner', 'Intermediate', 'Advanced'],
  age: ['8+', '12+', 'Adult', 'Senior Friendly'],
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const toggleFilter = (category: keyof Omit<FilterState, 'showFavoritesOnly'>, value: string) => {
    const activeList = filters[category];
    const updatedList = activeList.includes(value)
      ? activeList.filter((item) => item !== value)
      : [...activeList, value];

    onChange({
      ...filters,
      [category]: updatedList,
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    category: keyof Omit<FilterState, 'showFavoritesOnly'>,
    value: string
  ) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleFilter(category, value);
    }
  };

  const renderSection = (
    title: string,
    category: keyof Omit<FilterState, 'showFavoritesOnly'>,
    options: string[]
  ) => {
    return (
      <div className="mb-8 border-b border-warm-border-light/20 dark:border-warm-border-dark/20 pb-6 last:border-b-0">
        <h4 className="text-sm font-bold tracking-wide uppercase text-warm-text-light dark:text-warm-text-dark mb-4">
          {title}
        </h4>
        <div className="space-y-3">
          {options.map((option) => {
            const isChecked = filters[category].includes(option);
            return (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer group focus-within:outline-none"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFilter(category, option)}
                    onKeyDown={(e) => handleKeyDown(e, category, option)}
                    className="sr-only"
                    aria-checked={isChecked}
                    aria-label={`Filter by ${option}`}
                  />
                  {/* Large 24x24px checkbox to satisfy accessibility target standards */}
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-warm-accent-light border-warm-accent-light dark:bg-warm-accent-dark dark:border-warm-accent-dark'
                        : 'border-warm-border-light dark:border-warm-border-dark bg-warm-bg-light dark:bg-warm-surface-dark group-hover:border-warm-accent-light/50 dark:group-hover:border-warm-accent-dark/50'
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="w-4 h-4 text-white dark:text-warm-bg-dark stroke-[3px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-warm-muted-light dark:text-warm-muted-dark group-hover:text-warm-text-light dark:group-hover:text-warm-text-dark transition-colors duration-150 select-none">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-2xl p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-warm-border-light/20 dark:border-warm-border-dark/20">
        <h3 className="text-lg font-bold text-warm-text-light dark:text-warm-text-dark">
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-warm-accent-light dark:text-warm-accent-dark hover:underline focus-visible:ring-1 p-1 rounded"
        >
          Reset All
        </button>
      </div>

      {renderSection('App Type', 'type', FILTER_OPTIONS.type)}
      {renderSection('Cognitive Skills', 'skills', FILTER_OPTIONS.skills)}
      {renderSection('Difficulty', 'difficulty', FILTER_OPTIONS.difficulty)}
      {renderSection('Age Group', 'age', FILTER_OPTIONS.age)}
    </div>
  );
};
