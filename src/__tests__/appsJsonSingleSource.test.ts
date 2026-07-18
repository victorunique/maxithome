import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('apps.json Single Source of Truth', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const rootAppsJson = path.join(rootDir, 'apps.json');
  const publicAppsJson = path.join(rootDir, 'public/apps.json');
  const prerenderScript = path.join(rootDir, 'scripts/prerender.js');

  it('should have apps.json in the public directory', () => {
    expect(fs.existsSync(publicAppsJson)).toBe(true);
  });

  it('should NOT have a duplicate apps.json in the root directory', () => {
    expect(fs.existsSync(rootAppsJson)).toBe(false);
  });

  it('should reference the public apps.json inside scripts/prerender.js', () => {
    const prerenderContent = fs.readFileSync(prerenderScript, 'utf8');
    // It should reference public/apps.json, not root apps.json
    expect(prerenderContent).toContain('public/apps.json');
    expect(prerenderContent).not.toContain("const APPS_JSON_PATH = path.resolve(__dirname, '../apps.json');");
  });
});

describe('apps.json schema and content validation', () => {
  const rootDir = path.resolve(__dirname, '../../');
  const publicAppsJson = path.join(rootDir, 'public/apps.json');

  it('should validate the schema of each app in apps.json', () => {
    const apps = JSON.parse(fs.readFileSync(publicAppsJson, 'utf8'));
    expect(Array.isArray(apps)).toBe(true);

    const validTypes = ['Tool', 'Game', 'Learning', 'Assessment', 'Other'];
    const validSkills = [
      'Memory', 'Focus', 'Attention', 'Logic', 'Reasoning', 'Spatial',
      'Processing Speed', 'Language', 'Mathematics', 'Creativity',
      'Executive Function', 'Decision Making'
    ];
    const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const validAges = ['8+', '12+', 'Adult', 'Senior Friendly'];

    apps.forEach((app: any) => {
      expect(app.id).toBeDefined();
      expect(typeof app.id).toBe('string');
      expect(app.name).toBeDefined();
      expect(typeof app.name).toBe('string');
      expect(app.subdomain).toBeDefined();
      expect(typeof app.subdomain).toBe('string');
      expect(app.icon).toBeDefined();
      expect(typeof app.icon).toBe('string');
      expect(app.shortDescription).toBeDefined();
      expect(typeof app.shortDescription).toBe('string');
      expect(app.longDescription).toBeDefined();
      expect(typeof app.longDescription).toBe('string');
      expect(app.howToUse).toBeDefined();
      expect(typeof app.howToUse).toBe('string');
      expect(Array.isArray(app.screenshots)).toBe(true);
      expect(app.createdAt).toBeDefined();
      expect(app.updatedAt).toBeDefined();
      
      expect(app.tags).toBeDefined();
      expect(Array.isArray(app.tags.type)).toBe(true);
      app.tags.type.forEach((t: string) => expect(validTypes).toContain(t));

      expect(Array.isArray(app.tags.skills)).toBe(true);
      app.tags.skills.forEach((s: string) => expect(validSkills).toContain(s));

      expect(Array.isArray(app.tags.difficulty)).toBe(true);
      app.tags.difficulty.forEach((d: string) => expect(validDifficulties).toContain(d));

      expect(Array.isArray(app.tags.age)).toBe(true);
      app.tags.age.forEach((a: string) => expect(validAges).toContain(a));
    });
  });

  it('should contain the sky-scape app with correct metadata', () => {
    const apps = JSON.parse(fs.readFileSync(publicAppsJson, 'utf8'));
    const skyScape = apps.find((app: any) => app.id === 'sky-scape');
    expect(skyScape).toBeDefined();
    expect(skyScape.name).toBe('Sky Scape');
    expect(skyScape.subdomain).toBe('https://sky-scape.maxithome.com/');
    expect(skyScape.icon).toBe('/icons/sky-scape.png');
    expect(skyScape.screenshots).toContain('/screenshots/sky-scape-1.jpg');
    expect(skyScape.screenshots).toContain('/screenshots/sky-scape-2.jpg');
  });
});

