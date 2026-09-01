import type { MetadataRoute } from "next";
import { siteUrls } from "@/config/ecosystem";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/our-school", "/our-story", "/guardian-programme", "/updates", "/transparency", "/how-we-are-structured", "/contact", "/privacy", "/terms", "/refunds"].map((path) => ({ url: `${siteUrls.hammad}${path}`, changeFrequency: path === "/updates" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
