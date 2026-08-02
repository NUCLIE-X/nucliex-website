import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatPostDate, getPost, posts } from "@/data/posts";
import { company } from "@/data/company";
import { env } from "@/lib/env";
import { Section } from "@/components/layout/section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Prose } from "@/components/ui/prose";
import { Toc } from "@/components/ui/toc";
import { JsonLd } from "@/components/utility/json-ld";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/${slug}.mdx`);

  const sorted = [...posts].sort((a, b) => a.date.localeCompare(b.date));
  const index = sorted.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: company.legalName },
    publisher: { "@type": "Organization", name: company.legalName },
    mainEntityOfPage: `${env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <Section spacing="tight" className="pt-16 md:pt-20">
        <Breadcrumb
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        <div className="max-w-3xl">
          <p className="text-label text-brand-500 uppercase">{post.category}</p>
          <h1 className="text-display-2 font-display text-brand-900 mt-3 font-bold">
            {post.title}
          </h1>
          <p className="text-body-sm text-fg-subtle mt-4">
            {formatPostDate(post.date)} · {post.readingMinutes} min read · {company.brand} team
          </p>
        </div>
      </Section>

      <Section spacing="tight" className="pb-16 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Prose>
              <Content />
            </Prose>

            <nav
              aria-label="More articles"
              className="border-border mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-between"
            >
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}` as Route}
                  className="text-body text-brand-500 hover:text-brand-600 inline-flex items-center gap-2 font-medium"
                >
                  <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
                  {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}` as Route}
                  className="text-body text-brand-500 hover:text-brand-600 inline-flex items-center gap-2 text-right font-medium"
                >
                  {next.title}
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              ) : null}
            </nav>

            {related.length > 0 ? (
              <aside className="mt-12">
                <h2 className="text-label text-fg-subtle uppercase">Related reading</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}` as Route}
                        className="text-body text-fg hover:text-brand-500 font-medium"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <Toc items={post.toc} />
          </div>
        </div>
      </Section>
    </>
  );
}
