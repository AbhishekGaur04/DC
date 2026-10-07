// scripts/prerender.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');

async function prerender() {
  console.log('🚀 Starting Static Site Pre-Rendering (SSG)...');

  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at ${templatePath}. Did you run "vite build" first?`);
  }

  const ssrEntryPath = path.resolve(ssrDir, 'entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`SSR bundle not found at ${ssrEntryPath}. Did you build the SSR entry?`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render, routes, seoData } = await import(pathToFileURL(ssrEntryPath).href);

  console.log(`📄 Generating static HTML for ${routes.length} routes...`);

  for (const route of routes) {
    const seo = seoData[route] || {
      title: "Diamond Construction (DC) — World-Class Quality in Every Layer",
      description: "Diamond Construction specializes in Thermal Power, Refinery & Metro projects with nearly two decades of proven excellence in Kota, Rajasthan.",
      canonical: `https://www.diamondconstructionkota.com${route === '/' ? '/' : route}`,
      ogType: "website",
      schema: {},
    };

    console.log(`  ➔ Rendering route: ${route}`);
    const appHtml = render(route);

    let html = template;

    // 1. Inject pre-rendered React markup into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // 2. Replace title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

    // 3. Replace meta description
    const metaDescRegex = /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
    const newMetaDesc = `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`;
    if (metaDescRegex.test(html)) {
      html = html.replace(metaDescRegex, newMetaDesc);
    } else {
      html = html.replace('</head>', `  ${newMetaDesc}\n  </head>`);
    }

    // 4. Inject or Replace self-referencing canonical tag
    const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i;
    const newCanonical = `<link rel="canonical" href="${seo.canonical}" />`;
    if (canonicalRegex.test(html)) {
      html = html.replace(canonicalRegex, newCanonical);
    } else {
      html = html.replace('</head>', `  ${newCanonical}\n  </head>`);
    }

    // 5. Update Open Graph tags
    const ogTitleRegex = /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
    const newOgTitle = `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`;
    if (ogTitleRegex.test(html)) {
      html = html.replace(ogTitleRegex, newOgTitle);
    } else {
      html = html.replace('</head>', `  ${newOgTitle}\n  </head>`);
    }

    const ogDescRegex = /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
    const newOgDesc = `<meta property="og:description" content="${seo.description.replace(/"/g, '&quot;')}" />`;
    if (ogDescRegex.test(html)) {
      html = html.replace(ogDescRegex, newOgDesc);
    } else {
      html = html.replace('</head>', `  ${newOgDesc}\n  </head>`);
    }

    const ogUrlRegex = /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
    const newOgUrl = `<meta property="og:url" content="${seo.canonical}" />`;
    if (ogUrlRegex.test(html)) {
      html = html.replace(ogUrlRegex, newOgUrl);
    } else {
      html = html.replace('</head>', `  ${newOgUrl}\n  </head>`);
    }

    // 6. Inject Schema.org JSON-LD
    if (seo.schema && Object.keys(seo.schema).length > 0) {
      const schemaScript = `\n  <script type="application/ld+json" id="schema-ld-json">\n${JSON.stringify(seo.schema, null, 2)}\n  </script>`;
      html = html.replace('</head>', `${schemaScript}\n</head>`);
    }

    // Determine target directory & file
    const targetDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`    ✔ Wrote ${path.relative(rootDir, targetFile)} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
  }

  // Cleanup temporary SSR bundle
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up temporary SSR build artifacts.');
  }

  console.log('✨ Static pre-rendering completed successfully!');
}

prerender().catch((err) => {
  console.error('❌ Error during prerendering:', err);
  process.exit(1);
});
