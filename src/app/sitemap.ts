import type { MetadataRoute } from "next";
import { EU_COUNTRIES, UA_CITIES_LIST, EU_CITIES_LIST } from "@/const/cities";

const SITE_URL = "https://svitsuchasnykhperevezen.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contacts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/parcels`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/prices`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = [];

  // Общие направления: /book/poland, /book/germany, /book/netherlands, /book/belgium
  for (const dir of EU_COUNTRIES) {
    bookRoutes.push({
      url: `${SITE_URL}/book/${dir}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Пары UA <-> EU
  for (const ua of UA_CITIES_LIST) {
    for (const eu of EU_CITIES_LIST) {
      bookRoutes.push({
        url: `${SITE_URL}/book/${ua.slug}-${eu.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
      bookRoutes.push({
        url: `${SITE_URL}/book/${eu.slug}-${ua.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return [...staticRoutes, ...bookRoutes];
}
