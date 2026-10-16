// Search-result metadata helpers. They only shorten what is shown in <title> and
// the meta description; page H1s and body copy are never touched. A page can set
// `metaTitle` / `metaDescription` to override the derived value.

export const SITE_NAME_SUFFIX = " | Dental Finance UK";
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 160;

function truncateAtWord(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 20 ? cut.slice(0, lastSpace) : cut).replace(/[\s,:;|-]+$/, "")}…`;
}

export function buildMetaTitle(page) {
  if (page.metaTitle) return page.metaTitle;
  const title = page.title.trim();
  if (title.length + SITE_NAME_SUFFIX.length <= MAX_TITLE_LENGTH) {
    return `${title}${SITE_NAME_SUFFIX}`;
  }
  const candidates = [title, title.split(":")[0], title.split(" | ")[0], title.split(" – ")[0]]
    .map((candidate) => candidate.trim())
    .filter((candidate) => candidate.length >= 25 && candidate.length <= MAX_TITLE_LENGTH);
  return candidates[0] ?? truncateAtWord(title, MAX_TITLE_LENGTH);
}

export function buildMetaDescription(page) {
  if (page.metaDescription) return page.metaDescription;
  const description = (page.description ?? "").trim();
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  const window = description.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf(".") === window.length - 1 ? window.length - 1 : -1);
  if (lastSentence >= 80) return description.slice(0, lastSentence + 1);
  return truncateAtWord(description, MAX_DESCRIPTION_LENGTH);
}
