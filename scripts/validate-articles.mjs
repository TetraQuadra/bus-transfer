// Simple build-time validator to ensure each article slug exists in all locales
// Locales: uk, ru, en
import fs from "node:fs";
import path from "node:path";

const LOCALES = ["uk", "ru", "en"];
const ROOT = path.join(process.cwd(), "src", "content", "articles");

function listSlugs(locale) {
  const dir = path.join(ROOT, locale);
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.endsWith(".mdx"))
      .map((d) => d.name.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

function main() {
  const slugsByLocale = Object.fromEntries(
    LOCALES.map((loc) => [loc, new Set(listSlugs(loc))])
  );

  const allSlugs = new Set();
  for (const loc of LOCALES) {
    for (const slug of slugsByLocale[loc]) allSlugs.add(slug);
  }

  const missing = [];
  for (const slug of allSlugs) {
    for (const loc of LOCALES) {
      if (!slugsByLocale[loc].has(slug)) {
        missing.push({ slug, locale: loc });
      }
    }
  }

  if (missing.length > 0) {
    const grouped = Object.create(null);
    for (const m of missing) {
      grouped[m.slug] = grouped[m.slug] || [];
      grouped[m.slug].push(m.locale);
    }
    const lines = Object.entries(grouped)
      .map(([slug, locales]) => ` - ${slug}: missing [${locales.join(", ")}]`)
      .join("\n");
    console.error("\n[validate-articles] Some articles are missing locales:");
    console.error(lines + "\n");
    console.error(
      "Each article must have an MDX file per locale at src/content/articles/{uk,ru,en}/{slug}.mdx"
    );
    process.exit(1);
  }
}

main();
