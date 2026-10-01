export const prerender = true;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function stripMdx(body: string): string {
  const lines = body.split('\n');
  const cleaned: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      cleaned.push(line);
      continue;
    }

    if (inCodeBlock) {
      cleaned.push(line);
      continue;
    }

    // Outside code blocks: strip MDX import lines
    if (/^\s*import\s+.*?from\s+['"][^'"]+['"];?\s*$/.test(line)) {
      continue;
    }

    // Outside code blocks: strip component tags, keeping inner text
    // Replace opening, closing, and self-closing tags for capitalized components
    let processed = line
      .replace(/<[A-Z][a-zA-Z0-9]*(?:\s+[^>]*)?\/>/g, '')
      .replace(/<\/[A-Z][a-zA-Z0-9]*>/g, '')
      .replace(/<[A-Z][a-zA-Z0-9]*(?:\s+[^>]*)?>/g, '');

    cleaned.push(processed);
  }

  return cleaned.join('\n').trim();
}

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const siteUrl = 'https://docs.telmoni.com';

  // Sort docs deterministically and exclude 404 page
  const filtered = docs
    .filter((entry) => entry.id !== '404.mdx' && entry.id !== '404')
    .sort((a, b) => a.id.localeCompare(b.id));

  const pageTexts: string[] = [];

  for (const entry of filtered) {
    const title = entry.data.title;
    let path = entry.id.replace(/\.(mdx|md)$/, '');
    if (path === 'index') {
      path = '';
    }
    const pageUrl = path === '' ? `${siteUrl}/` : `${siteUrl}/${path}/`;

    const body = entry.body ? stripMdx(entry.body) : '';
    pageTexts.push(`# ${title}\nSource: ${pageUrl}\n\n${body}`);
  }

  const corpus = pageTexts.join('\n\n') + '\n';

  return new Response(corpus, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
