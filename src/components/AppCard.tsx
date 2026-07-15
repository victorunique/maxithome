import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink } from 'lucide-react';
import type { CognitiveApp } from '../types';
import { AppIcon } from './AppIcon';

interface AppCardProps {
  app: CognitiveApp;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="relative group glass-card bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-2xl p-6 flex flex-col justify-between h-full hover:bg-warm-surface-light/80 dark:hover:bg-warm-surface-dark/80 hover:border-warm-accent-light/30 dark:hover:border-warm-accent-dark/30 hover:-translate-y-2 hover:scale-[1.02] duration-300">
      <div>
        {/* Top line with Icon and Bookmarks toggle */}
        <div className="flex justify-between items-start mb-6">
          <AppIcon id={app.id} className="w-7 h-7" />
          
          <button
            onClick={() => onToggleFavorite(app.id)}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark text-warm-muted-light dark:text-warm-muted-dark hover:text-red-500 dark:hover:text-red-400 focus-visible:ring-2 focus-visible:ring-warm-accent-light dark:focus-visible:ring-warm-accent-dark transition-colors duration-200"
            aria-label={`Save ${app.name} to bookmarks`}
            aria-pressed={isFavorite}
          >
            <Heart
              className={`w-6 h-6 transition-all duration-200 ${
                isFavorite
                  ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400 scale-110'
                  : 'text-warm-muted-light dark:text-warm-muted-dark'
              }`}
            />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-warm-text-light dark:text-warm-text-dark mb-2">
          {app.name}
        </h3>
        
        <p className="text-warm-muted-light dark:text-warm-muted-dark text-sm leading-relaxed mb-6 h-12 overflow-hidden">
          {app.shortDescription}
        </p>

        {/* Tag badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {/* Skill Tag */}
          {app.tags.skills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 text-warm-accent-light dark:text-warm-accent-dark text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
          {/* Difficulty Tag */}
          <span className="px-2 py-0.5 rounded-md bg-warm-surface-light dark:bg-warm-surface-dark text-warm-muted-light dark:text-warm-muted-dark text-xs font-semibold">
            {app.tags.difficulty[0]}
          </span>
          {/* Age Tag */}
          <span className="px-2 py-0.5 rounded-md bg-warm-surface-light dark:bg-warm-surface-dark text-warm-muted-light dark:text-warm-muted-dark text-xs font-semibold">
            {app.tags.age[0]}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Link
          to={`/apps/${app.id}`}
          className="flex items-center justify-center px-4 py-3 border border-warm-border-light dark:border-warm-border-dark text-sm font-bold text-warm-text-light dark:text-warm-text-dark rounded-full hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Details
        </Link>
        <a
          href={app.subdomain}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-1.5 px-4 py-3 bg-warm-accent-light dark:bg-warm-accent-dark text-sm font-bold text-white dark:text-warm-bg-dark rounded-full hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span>Play</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
