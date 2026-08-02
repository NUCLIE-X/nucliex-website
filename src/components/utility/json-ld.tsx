type JsonLdProps = {
  /** A schema.org node — caller is responsible for only stating real facts. */
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Serialised server-side from typed literals; < escaped to keep the tag inert.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
