import { collection } from "typesense-ts";

export const postCollection = collection({
  name: "posts",
  fields: [
    { name: "title", type: "string" },
    { name: "published_at", type: "int32", sort: true },
  ],
  default_sorting_field: "published_at",
});

declare module "typesense-ts" {
  interface Collections {
    posts: typeof postCollection.schema;
  }
}
