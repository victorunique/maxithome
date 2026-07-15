import React from 'react';
import * as Icons from 'lucide-react';

interface AppIconProps {
  id: string;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ id, className = 'w-6 h-6' }) => {
  // Map app ID to Lucide icon component
  const getIcon = () => {
    switch (id) {
      case 'flashlearn':
        return Icons.Languages;
      case 'maths-quest':
        return Icons.Calculator;
      case 'herbert':
        return Icons.Bot;
      case 'word-search':
        return Icons.Search;
      case 'sudoku':
        return Icons.Grid3X3;
      case 'chess':
        return Icons.Crown;
      case 'gomoku':
        return Icons.CircleDot;
      case 'jigsaw':
        return Icons.Puzzle;
      case 'uno':
        return Icons.Layers;
      case 'match-3':
        return Icons.Gem;
      case 'block-craft':
        return Icons.Box;
      default:
        return Icons.HelpCircle;
    }
  };

  const IconComponent = getIcon();

  // Get matching warm color backgrounds from existing index.html classes
  const getBgStyle = () => {
    switch (id) {
      case 'flashlearn':
        return 'bg-orange-500/10 text-orange-500 dark:text-orange-400';
      case 'maths-quest':
        return 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400';
      case 'herbert':
        return 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400';
      case 'word-search':
        return 'bg-green-500/10 text-green-500 dark:text-green-400';
      case 'sudoku':
        return 'bg-blue-500/10 text-blue-500 dark:text-blue-400';
      case 'chess':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'gomoku':
        return 'bg-slate-700/10 text-slate-600 dark:text-slate-300';
      case 'jigsaw':
        return 'bg-purple-500/10 text-purple-500 dark:text-purple-400';
      case 'uno':
        return 'bg-red-500/10 text-red-500 dark:text-red-400';
      case 'match-3':
        return 'bg-pink-500/10 text-pink-500 dark:text-pink-400';
      case 'block-craft':
        return 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400';
      default:
        return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${getBgStyle()}`}>
      <IconComponent className={className} />
    </div>
  );
};
