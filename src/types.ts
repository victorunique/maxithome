export type AppType = 'Tool' | 'Game' | 'Learning' | 'Assessment' | 'Other';

export type CognitiveSkill =
  | 'Memory'
  | 'Focus'
  | 'Attention'
  | 'Logic'
  | 'Reasoning'
  | 'Spatial'
  | 'Processing Speed'
  | 'Language'
  | 'Mathematics'
  | 'Creativity'
  | 'Executive Function'
  | 'Decision Making';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type AgeSuitability = '8+' | '12+' | 'Adult' | 'Senior Friendly';

export interface AppTags {
  type: AppType[];
  skills: CognitiveSkill[];
  difficulty: DifficultyLevel[];
  age: AgeSuitability[];
}

export interface CognitiveApp {
  id: string;
  name: string;
  subdomain: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  howToUse: string;
  screenshots: string[];
  officialWebsite?: string;
  featured?: boolean;
  new?: boolean;
  tags: AppTags;
}
