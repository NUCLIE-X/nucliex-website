import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { posts } from "@/data/posts";
import { env } from "@/lib/env";

const staticRoutes = [
  "",
  "/products",
  "/products/ssd/sata",
  "/products/ssd/nvme",
  "/products/roadmap",
  "/services",
  "/business",
  "/business/quote",
  "/partners",
  "/partners/apply",
  "/support",
  "/support/warranty",
  "/support/rma",
  "/support/downloads",
  "/support/faq",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/warranty-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const buildDate = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: buildDate,
    })),
    ...products.map((product) => ({
      url: `${base}/products/${product.slug}`,
      lastModified: buildDate,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified: buildDate,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00`),
    })),
  ];
}
