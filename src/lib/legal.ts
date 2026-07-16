import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';

export type LegalDocSlug = 'mentions-legales' | 'cgu' | 'cgv' | 'politique-confidentialite' | 'politique-cookies';

export type LegalTocEntry = {
  id: string;
  title: string;
};

const LEGAL_DIR = path.join(process.cwd(), 'src/content/legal');

type CgvMeta = { lastUpdated: string };

function getCgvLastUpdated(): string {
  const meta = JSON.parse(fs.readFileSync(path.join(LEGAL_DIR, 'cgv-meta.json'), 'utf8')) as CgvMeta;
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(meta.lastUpdated));
}

export function getLegalMarkdown(slug: LegalDocSlug): string {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, `${slug}.md`), 'utf8');
  return slug === 'cgv' ? raw.replace('{{LAST_UPDATED}}', getCgvLastUpdated()) : raw;
}

export function getLegalToc(markdown: string): LegalTocEntry[] {
  const slugger = new GithubSlugger();
  const headingLines = markdown.match(/^##\s+.+$/gm) ?? [];

  return headingLines.map((line) => {
    const title = line.replace(/^##\s+/, '').trim();
    return { id: slugger.slug(title), title };
  });
}
