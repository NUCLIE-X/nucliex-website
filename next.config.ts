import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";

/**
 * STATIC EXPORT MODE (client decision 2026-08-02): the site builds to plain
 * files in /out and deploys to any static host. Forms compose prefilled
 * email/WhatsApp messages client-side; the server-action implementation is
 * retained in src/lib/actions for the future switch back to full mode.
 *
 * Security headers moved to public/_headers (consumed by Cloudflare Pages
 * and Netlify) because a static export has no server to set them.
 */
const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "mdx"],
  // No image optimizer on a static host.
  images: { unoptimized: true },
};

// rehype-slug gives headings stable ids for the blog Toc. Requires the
// webpack build (see §0 of CLAUDE.md) — plugin options don't serialise for
// Turbopack, which this machine can't run anyway.
const withMDX = createMDX({
  options: { rehypePlugins: [rehypeSlug] },
});

export default withMDX(nextConfig);
