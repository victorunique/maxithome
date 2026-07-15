import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, ExternalLink, ArrowLeft, Calendar, ShieldAlert } from 'lucide-react';
import type { CognitiveApp } from '../types';
import { ScreenshotCarousel } from '../components/ScreenshotCarousel';
import { AppIcon } from '../components/AppIcon';

interface AppDetailViewProps {
  catalog: CognitiveApp[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  storageError?: boolean;
}

export const AppDetailView: React.FC<AppDetailViewProps> = ({
  catalog,
  favorites,
  toggleFavorite,
  storageError = false,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const app = useMemo(() => {
    return catalog.find((item) => item.id === id);
  }, [id, catalog]);

  // Navigate to 404 if app is not found
  React.useEffect(() => {
    if (catalog.length > 0 && !app) {
      navigate('/404', { replace: true });
    }
  }, [app, catalog, navigate]);

  // Scroll to top when app ID changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isFavorite = useMemo(() => {
    return app ? favorites.includes(app.id) : false;
  }, [app, favorites]);

  // Recommendation Algorithm: Match other records sharing maximum count of cognitive skills
  const relatedApps = useMemo(() => {
    if (!app) return [];
    return catalog
      .filter((other) => other.id !== app.id)
      .map((other) => {
        const sharedCount = other.tags.skills.filter((skill) =>
          app.tags.skills.includes(skill)
        ).length;
        return { app: other, sharedCount };
      })
      .sort((a, b) => b.sharedCount - a.sharedCount)
      .slice(0, 3)
      .map((item) => item.app);
  }, [app, catalog]);

  if (!app) {
    // Skeletons while fetching catalog
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-6 w-32 bg-warm-surface-light dark:bg-warm-surface-dark rounded animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-warm-surface-light dark:bg-warm-surface-dark rounded-2xl animate-pulse"></div>
          <div className="h-96 bg-warm-surface-light dark:bg-warm-surface-dark rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 min-h-screen bg-warm-bg-light dark:bg-warm-bg-dark text-warm-text-light dark:text-warm-text-dark transition-colors duration-300">
      <Helmet>
        <title>{`${app.name} | MindFlex Cognitive Apps`}</title>
        <meta name="description" content={app.shortDescription} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation Bar */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-warm-muted-light dark:text-warm-muted-dark hover:text-warm-text-light dark:hover:text-warm-text-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Hero Header Card */}
        <section className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <AppIcon id={app.id} className="w-8 h-8" />
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-warm-text-light dark:text-warm-text-dark mb-2">
                  {app.name}
                </h1>
                <p className="text-warm-muted-light dark:text-warm-muted-dark text-base max-w-2xl leading-relaxed mb-4">
                  {app.shortDescription}
                </p>
                {/* Meta badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {app.tags.type.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 text-warm-accent-light dark:text-warm-accent-dark text-xs font-bold uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-warm-surface-light dark:bg-warm-surface-dark text-warm-muted-light dark:text-warm-muted-dark text-xs font-bold">
                    {app.tags.difficulty[0]}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-warm-surface-light dark:bg-warm-surface-dark text-warm-muted-light dark:text-warm-muted-dark text-xs font-bold">
                    {app.tags.age[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col items-center md:items-end space-y-3 w-full md:w-auto">
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => toggleFavorite(app.id)}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                    isFavorite
                      ? 'bg-red-500/10 border-red-500/50 text-red-500 dark:bg-red-400/10 dark:border-red-400/50 dark:text-red-400'
                      : 'border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark'
                  }`}
                  aria-label={`Save ${app.name} to bookmarks`}
                  aria-pressed={isFavorite}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <a
                  href={app.subdomain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-2 px-8 py-4 bg-warm-accent-light dark:bg-warm-accent-dark text-white dark:text-warm-bg-dark font-bold rounded-full shadow-lg shadow-warm-accent-light/20 dark:shadow-warm-accent-dark/20 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>Launch App</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* LocalStorage Error Badge (for FT-DETAIL-06) */}
              {storageError && (
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-red-500/10 text-red-500 dark:text-red-400 text-xs font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Favorites cannot be saved because cookies/storage are disabled.</span>
                </div>
              )}

              {/* FTC Disclaimer adjacent to play buttons */}
              <p className="text-[10px] text-warm-muted-light dark:text-warm-muted-dark text-center md:text-right max-w-xs leading-normal">
                Designed to challenge cognitive skills; does not claim to cure or prevent cognitive decline.
              </p>
            </div>
          </div>
        </section>

        {/* Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Screenshot Carousel */}
            <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Visual Mockup Interface</h2>
              <ScreenshotCarousel screenshots={app.screenshots} appName={app.name} />
            </div>

            {/* App Long Description */}
            <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">About this Application</h2>
              <p className="text-warm-text-light dark:text-warm-text-dark leading-relaxed whitespace-pre-line">
                {app.longDescription}
              </p>
            </div>

            {/* How to use */}
            <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">How to Play & Use</h2>
              <div className="space-y-4">
                {app.howToUse.split('\n').map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 border border-warm-accent-light/30 dark:border-warm-accent-dark/30 text-warm-accent-light dark:text-warm-accent-dark flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-warm-text-light dark:text-warm-text-dark leading-relaxed pt-1">
                      {step.replace(/^\d+\.\s*/, '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specs & Recommendations Column (Right) */}
          <div className="space-y-8">
            {/* Specs Panel */}
            <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-6 pb-2 border-b border-warm-border-light/20 dark:border-warm-border-dark/20">
                Specifications
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-warm-muted-light dark:text-warm-muted-dark block mb-1">Developer</span>
                  <span className="font-semibold text-warm-text-light dark:text-warm-text-dark">Victor Xu</span>
                </div>
                <div>
                  <span className="text-warm-muted-light dark:text-warm-muted-dark block mb-1">Infrastructure</span>
                  <span className="font-semibold text-warm-text-light dark:text-warm-text-dark">Independent Subdomain Redirect</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-warm-muted-light dark:text-warm-muted-dark" />
                  <span className="text-warm-muted-light dark:text-warm-muted-dark">Last Updated: July 2026</span>
                </div>
                <div className="pt-2">
                  <span className="text-warm-muted-light dark:text-warm-muted-dark block mb-2">Cognitive Skills Exercised</span>
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-warm-surface-light dark:bg-warm-surface-dark text-warm-text-light dark:text-warm-text-dark text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Apps Grid */}
            <div className="bg-warm-surface-light/40 dark:bg-warm-surface-dark/40 border border-warm-border-light/40 dark:border-warm-border-dark/40 rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-6 pb-2 border-b border-warm-border-light/20 dark:border-warm-border-dark/20">
                Related Apps
              </h3>
              <div className="space-y-4">
                {relatedApps.map((other) => (
                  <Link
                    key={other.id}
                    to={`/apps/${other.id}`}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-warm-surface-light/60 dark:hover:bg-warm-surface-dark/60 transition-colors duration-200 group"
                  >
                    <AppIcon id={other.id} className="w-5 h-5" />
                    <div>
                      <h4 className="text-sm font-bold text-warm-text-light dark:text-warm-text-dark group-hover:text-warm-accent-light dark:group-hover:text-warm-accent-dark transition-colors duration-200">
                        {other.name}
                      </h4>
                      <p className="text-xs text-warm-muted-light dark:text-warm-muted-dark line-clamp-1">
                        {other.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
