import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";

const isDev = process.env.NODE_ENV === "development";

// Security headers per docs/03-ARCHITECTURE.md §5.
// CSP: Next.js emits inline bootstrap scripts, so 'unsafe-inline' is required until a
// nonce pipeline is added (post-launch hardening candidate). 'unsafe-eval' is dev-only
// for React Refresh. vitals.vercel-insights.com is the Speed Insights beacon endpoint.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

// rehype-slug gives headings stable ids for the blog Toc. Requires the
// webpack build (see §0 of CLAUDE.md) — plugin options don't serialise for
// Turbopack, which this machine can't run anyway.
const withMDX = createMDX({
  options: { rehypePlugins: [rehypeSlug] },
});

export default withMDX(nextConfig);
