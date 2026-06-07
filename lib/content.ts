import type { SiteContent } from "./types";
import contentData from "@/content/jairo.json";

export function getContent(): SiteContent {
  return contentData as SiteContent;
}
