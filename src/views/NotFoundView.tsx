import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-warm-bg-light dark:bg-warm-bg-dark text-warm-text-light dark:text-warm-text-dark flex items-center justify-center transition-colors duration-300">
      <Helmet>
        <title>Page Not Found | MindFlex</title>
        <meta name="description" content="The requested cognitive application or aggregator view could not be located." />
      </Helmet>

      <div className="text-center max-w-md mx-auto px-4">
        {/* ShieldAlert Icon in Amber/Red theme */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-warm-accent-light/10 dark:bg-warm-accent-dark/10 flex items-center justify-center text-warm-accent-light dark:text-warm-accent-dark mb-6">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">Application Not Found</h1>
        <p className="text-warm-muted-light dark:text-warm-muted-dark text-sm leading-relaxed mb-8">
          Oops! The page or application profile you are trying to view does not exist in the catalog directory, or was moved to another location.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-warm-accent-light dark:bg-warm-accent-dark text-white dark:text-warm-bg-dark font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home Directory</span>
        </Link>
      </div>
    </div>
  );
};
