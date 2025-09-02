import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type SupportedLocale = "uk" | "ru" | "en";

export type ArticleMdx = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
  content: string; // raw mdx
};

const ROOT = path.join(process.cwd(), "src", "content", "articles");

export async function readArticleFile(locale: SupportedLocale, slug: string) {
  const filePath = path.join(ROOT, locale, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    date: data.date ? String(data.date) : undefined,
    image: data.image ? String(data.image) : undefined,
    content,
  } as ArticleMdx;
}

export async function listArticleSlugs(): Promise<string[]> {
  const locales: SupportedLocale[] = ["uk", "ru", "en"];
  const set = new Set<string>();
  for (const loc of locales) {
    const dir = path.join(ROOT, loc);
    try {
      const files = await fs.readdir(dir);
      for (const f of files) {
        if (f.endsWith(".mdx")) set.add(f.replace(/\.mdx$/, ""));
      }
    } catch {
      // locale dir may not exist yet
    }
  }
  return Array.from(set);
}
