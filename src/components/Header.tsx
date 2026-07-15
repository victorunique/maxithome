import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, Type, Menu, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface HeaderProps {
  showFavoritesOnly?: boolean;
  onToggleFavorites?: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  showFavoritesOnly = false,
  onToggleFavorites,
}) => {
  const { theme, fontScale, toggleTheme, setFontScale } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  const handleFavoritesToggle = () => {
    if (!isHome) {
      navigate('/');
      // Wait for navigation and toggle
      setTimeout(() => {
        if (onToggleFavorites) onToggleFavorites(!showFavoritesOnly);
      }, 50);
    } else {
      if (onToggleFavorites) onToggleFavorites(!showFavoritesOnly);
    }
  };

  const cycleFontScale = () => {
    if (fontScale === 'normal') setFontScale('large');
    else if (fontScale === 'large') setFontScale('extra-large');
    else setFontScale('normal');
  };

  return (
    <nav className="fixed w-full z-50 transition-colors duration-300 glass-nav bg-warm-bg-light/75 dark:bg-warm-bg-dark/75 backdrop-blur-md border-b border-warm-border-light/20 dark:border-warm-border-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Branding */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link
              to="/"
              className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-warm-accent-light dark:focus-visible:ring-warm-accent-dark rounded-xl p-1"
            >
              <img
                src="/logo.png"
                alt="MindFlex Logo"
                className="w-10 h-10 rounded-xl shadow-lg shadow-warm-accent-light/20 dark:shadow-warm-accent-dark/20 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold tracking-tight text-warm-text-light dark:text-warm-text-dark">
                Mind<span className="text-warm-accent-light dark:text-warm-accent-dark">Flex</span>
              </span>
            </Link>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Bookmarks Toggle */}
            <button
              onClick={handleFavoritesToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                showFavoritesOnly
                  ? 'bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 border-warm-accent-light dark:border-warm-accent-dark text-warm-accent-light dark:text-warm-accent-dark'
                  : 'border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark'
              }`}
              aria-label="Toggle favorites grid view"
              aria-pressed={showFavoritesOnly}
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span>Favorites Only</span>
            </button>

            {/* Font Scale Button */}
            <button
              onClick={cycleFontScale}
              className="p-2 rounded-full border border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark transition-all flex items-center space-x-1"
              aria-label={`Change text size. Current: ${fontScale}`}
            >
              <Type className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark hover:bg-warm-surface-light dark:hover:bg-warm-surface-dark transition-all"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={cycleFontScale}
              className="p-2 rounded-full border border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark"
              aria-label="Font scale adjustment"
            >
              <Type className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark"
              aria-label="Theme toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-warm-muted-light dark:text-warm-muted-dark hover:text-warm-text-light dark:hover:text-warm-text-dark"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-warm-bg-light dark:bg-warm-bg-dark border-t border-warm-border-light/20 dark:border-warm-border-dark/20 px-4 pt-2 pb-6 space-y-4">
          
          <button
            onClick={() => {
              handleFavoritesToggle();
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-full border text-sm font-medium transition-all ${
              showFavoritesOnly
                ? 'bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 border-warm-accent-light dark:border-warm-accent-dark text-warm-accent-light dark:text-warm-accent-dark'
                : 'border-warm-border-light dark:border-warm-border-dark text-warm-muted-light dark:text-warm-muted-dark'
            }`}
          >
            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            <span>Favorites Only</span>
          </button>
        </div>
      )}
    </nav>
  );
};
