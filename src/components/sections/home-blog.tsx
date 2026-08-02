import Link from "next/link";
import type { Route } from "next";
import { posts, formatPostDate } from "@/data/posts";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Card, CardBody } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

/**
 * Renders nothing until three posts exist (docs/04 §2.8) — an empty blog is
 * worse than no blog.
 */
export function HomeBlog() {
  if (posts.length < 3) return null;
  const latest = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="From the blog"
          title="Guides written by the people who do the upgrades"
          action={
            <Link href="/blog" className="text-body text-brand-500 hover:text-brand-600 font-medium">
              All articles
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Card key={post.slug} interactive>
              <CardBody>
                <p className="text-label text-fg-subtle uppercase">{post.category}</p>
                <h3 className="text-h3 mt-3 font-semibold">
                  <Link
                    href={`/blog/${post.slug}` as Route}
                    className="after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-body-sm text-fg-muted mt-2">{post.description}</p>
                <p className="text-body-sm text-fg-subtle mt-4">
                  {formatPostDate(post.date)} · {post.readingMinutes} min read
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
