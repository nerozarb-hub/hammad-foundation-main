import type { MetadataRoute } from "next";
import { siteUrls } from "@/config/ecosystem";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${siteUrls.hammad}/sitemap.xml`, host: siteUrls.hammad }; }
