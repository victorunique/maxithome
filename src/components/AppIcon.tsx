import React from 'react';
import * as Icons from 'lucide-react';

interface AppIconProps {
  id: string;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  flashlearn: Icons.Languages,
  'maths-quest': Icons.Calculator,
  herbert: Icons.Bot,
  'word-search': Icons.Search,
  sudoku: Icons.Grid3X3,
  chess: Icons.Crown,
  gomoku: Icons.CircleDot,
  jigsaw: Icons.Puzzle,
  uno: Icons.Layers,
  'match-3': Icons.Gem,
  'block-craft': Icons.Box,
  'sky-scape': Icons.Plane,
  talkdrill: Icons.Speech,
};

const BG_STYLE_MAP: Record<string, string> = {
  flashlearn: 'bg-orange-500/10 text-orange-500 dark:text-orange-400',
  'maths-quest': 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400',
  herbert: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400',
  'word-search': 'bg-green-500/10 text-green-500 dark:text-green-400',
  sudoku: 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
  chess: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  gomoku: 'bg-slate-700/10 text-slate-600 dark:text-slate-300',
  jigsaw: 'bg-purple-500/10 text-purple-500 dark:text-purple-400',
  uno: 'bg-red-500/10 text-red-500 dark:text-red-400',
  'match-3': 'bg-pink-500/10 text-pink-500 dark:text-pink-400',
  'block-craft': 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400',
  'sky-scape': 'bg-sky-500/10 text-sky-500 dark:text-sky-400',
  talkdrill: 'bg-blue-600/10 text-blue-600 dark:text-blue-400',
};

export const AppIcon: React.FC<AppIconProps> = ({ id, className = 'w-6 h-6' }) => {
  const IconComponent = ICON_MAP[id] ?? Icons.HelpCircle;
  const bgStyle = BG_STYLE_MAP[id] ?? 'bg-slate-500/10 text-slate-500';

  return (
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${bgStyle}`}>
      <IconComponent className={className} />
    </div>
  );
};
