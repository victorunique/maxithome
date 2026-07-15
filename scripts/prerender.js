import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const APPS_JSON_PATH = path.resolve(__dirname, '../public/apps.json');

async function runPrerender() {
  console.log('Starting custom SEO prerender build step...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`Dist directory does not exist at ${DIST_DIR}. Build first!`);
    process.exit(1);
  }

  if (!fs.existsSync(APPS_JSON_PATH)) {
    console.error(`apps.json not found at ${APPS_JSON_PATH}`);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(APPS_JSON_PATH, 'utf-8'));
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  // List of routes to prerender
  const routes = [];

  // Home route
  routes.push({
    path: '/',
    title: 'MindFlex | Cognitive Training Apps & Games Aggregator',
    description: 'A curated collection of cognitive tools and classic games designed to keep your neural networks firing.'
  });

  // 404 route
  routes.push({
    path: '/404',
    title: 'Page Not Found | MindFlex',
    description: 'The requested cognitive application or aggregator view could not be located.'
  });

  const uniqueSkills = new Set();
  const uniqueTypes = new Set();

  // App detail routes
  catalog.forEach((app) => {
    routes.push({
      path: `/apps/${app.id}`,
      title: `${app.name} | MindFlex Cognitive Apps`,
      description: app.shortDescription
    });

    app.tags.skills.forEach((s) => uniqueSkills.add(s));
    app.tags.type.forEach((t) => uniqueTypes.add(t));
  });

  // Skill views
  uniqueSkills.forEach((skill) => {
    const formatted = skill.charAt(0).toUpperCase() + skill.slice(1);
    routes.push({
      path: `/skills/${skill.toLowerCase()}`,
      title: `Cognitive ${formatted} Apps & Exercises | MindFlex`,
      description: `Explore all cognitive brain training applications designed to challenge and improve your ${skill.toLowerCase()} skills.`
    });
  });

  // Type views
  uniqueTypes.forEach((type) => {
    const formatted = type.charAt(0).toUpperCase() + type.slice(1);
    routes.push({
      path: `/type/${type.toLowerCase()}`,
      title: `Cognitive ${formatted} Applications | MindFlex`,
      description: `Discover user-friendly cognitive ${type.toLowerCase()} applications, puzzles, and interactive exercises.`
    });
  });

  // Create subdirectories and write index.html files
  for (const route of routes) {
    // Skip homepage as index.html already exists at root
    if (route.path === '/') continue;

    const routeDir = path.join(DIST_DIR, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    // Inject customized metadata into template indexHtml
    let html = indexHtml;
    
    // Replace Title
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );
    
    // Replace description meta tag
    html = html.replace(
      /<meta name="description" content=".*?"\s*\/?>/,
      `<meta name="description" content="${route.description}">`
    );

    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
    console.log(`Prerendered: ${route.path} -> index.html`);
  }

  console.log(`Prerendering completed successfully! Prerendered ${routes.length} paths.`);
}

runPrerender().catch((err) => {
  console.error('Error during prerendering:', err);
  process.exit(1);
});
