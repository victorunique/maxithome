import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from './context/SettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AppDetailView } from './views/AppDetailView';
import { NotFoundView } from './views/NotFoundView';
import { getAppCatalog } from './utils/getAppCatalog';
import { useFavorites } from './hooks/useFavorites';
import type { CognitiveApp } from './types';

export const AppContent: React.FC = () => {
  const [catalog, setCatalog] = useState<CognitiveApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favorites, toggleFavorite, storageError } = useFavorites();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await getAppCatalog();
        setCatalog(data);
      } catch (err) {
        console.error('Failed to load apps catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-bg-light dark:bg-warm-bg-dark flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-warm-accent-light dark:border-warm-accent-dark border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-warm-muted-light dark:text-warm-muted-dark">Loading MindFlex directory...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg-light dark:bg-warm-bg-dark text-warm-text-light dark:text-warm-text-dark flex flex-col justify-between transition-colors duration-300">
      <Header
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={setShowFavoritesOnly}
      />
      
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                catalog={catalog}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
              />
            }
          />
          <Route
            path="/skills/:skill"
            element={
              <HomeView
                catalog={catalog}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
              />
            }
          />
          <Route
            path="/type/:type"
            element={
              <HomeView
                catalog={catalog}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
              />
            }
          />
          <Route
            path="/apps/:id"
            element={
              <AppDetailView
                catalog={catalog}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                storageError={storageError}
              />
            }
          />
          <Route path="/404" element={<NotFoundView />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <Router>
          <AppContent />
        </Router>
      </SettingsProvider>
    </HelmetProvider>
  );
};

export default App;
