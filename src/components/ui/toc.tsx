type TocProps = {
  items: { id: string; title: string }[];
};

/** Sticky on-this-page navigation — blog articles, lg+ only (docs/04 §10). */
export function Toc({ items }: TocProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
      <p className="text-label text-fg-subtle uppercase">On this page</p>
      <ul className="mt-4 space-y-2 border-l border-border pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="duration-fast block text-body-sm text-fg-muted transition-colors hover:text-brand-500"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
