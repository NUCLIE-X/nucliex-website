import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { formatPostDate, posts } from "@/data/posts";
import { Section } from "@/components/layout/section";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Storage & IT guides",
  description: "Practical guides on SSDs, upgrades, and keeping business IT running.",
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Section spacing="tight" className="pt-16 md:pt-20">
        <p className="text-label text-brand-500 uppercase">Blog</p>
        <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
          Storage &amp; IT guides
        </h1>
        <p className="text-body-lg text-fg-muted mt-4 max-w-[56ch]">
          Written by the people who do the upgrades, run the networks, and
          process the RMAs. Practical over promotional.
        </p>
      </Section>

      <Section className="pt-0">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Card interactive className="h-full">
                <CardBody>
                  <p className="text-label text-fg-subtle uppercase">{post.category}</p>
                  <h2 className="text-h3 mt-3 font-semibold">
                    <Link
                      href={`/blog/${post.slug}` as Route}
                      className="after:absolute after:inset-0"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-body-sm text-fg-muted mt-2">{post.description}</p>
                  <p className="text-body-sm text-fg-subtle mt-4">
                    {formatPostDate(post.date)} · {post.readingMinutes} min read
                  </p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
