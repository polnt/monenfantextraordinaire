import type { MetadataRoute } from 'next';
import { FORMATIONS, OUTILS, PACKS } from '@/lib/catalog';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://monenfantextraordinaire.com';

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/formations`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/outils`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/ressources`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/comprendre`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/aider`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/qui-suis-je`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/le-site`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/reseaux`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const formationRoutes: MetadataRoute.Sitemap = FORMATIONS.map((formation) => ({
    url: `${BASE_URL}/formations/${formation.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const outilRoutes: MetadataRoute.Sitemap = OUTILS.map((outil) => ({
    url: `${BASE_URL}/outils/${outil.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const packRoutes: MetadataRoute.Sitemap = PACKS.map((pack) => ({
    url: `${BASE_URL}/packs/${pack.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...formationRoutes, ...outilRoutes, ...packRoutes];
}
