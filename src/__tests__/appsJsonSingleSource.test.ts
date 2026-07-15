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
