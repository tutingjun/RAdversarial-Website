import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const paper = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({ title: z.string() }),
});

export const collections = { paper };
