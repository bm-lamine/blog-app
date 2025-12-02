// utils/slugify.ts
export function slugify(title: string): string {
  return title
    .toLowerCase() // convert to lowercase
    .trim() // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // remove all non-word chars except space and dash
    .replace(/\s+/g, "-") // replace spaces with dash
    .replace(/-+/g, "-"); // collapse multiple dashes
}
