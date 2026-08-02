"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { DownloadItem } from "@/data/downloads";
import { Select } from "@/components/ui/select";

/**
 * Filterable document table (docs/06 §3). Every link's accessible name
 * states file type and size: "NX-500 datasheet, PDF, 420 KB".
 */
export function DownloadTable({ items }: { items: DownloadItem[] }) {
  const [product, setProduct] = useState("all");
  const [type, setType] = useState("all");

  const products = useMemo(
    () => [...new Set(items.map((i) => i.product))],
    [items],
  );
  const types = useMemo(() => [...new Set(items.map((i) => i.type))], [items]);

  const filtered = items.filter(
    (item) =>
      (product === "all" || item.product === product) &&
      (type === "all" || item.type === type),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label
            htmlFor="filter-product"
            className="mb-2 block text-label text-fg-subtle uppercase"
          >
            Product
          </label>
          <Select
            id="filter-product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="min-w-40"
          >
            <option value="all">All products</option>
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor="filter-type"
            className="mb-2 block text-label text-fg-subtle uppercase"
          >
            Document type
          </label>
          <Select
            id="filter-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="min-w-40"
          >
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <table className="w-full border-collapse">
        <caption className="sr-only">Downloadable documents</caption>
        <thead>
          <tr className="border-b border-border">
            {["Title", "Product", "Type", "Version", "Date", "Size", ""].map(
              (heading, i) => (
                <th
                  key={i}
                  scope="col"
                  className="py-3 pr-4 text-left text-label text-fg-subtle uppercase"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.href} className="border-b border-border">
              <th
                scope="row"
                className="py-3 pr-4 text-left text-body font-medium text-fg"
              >
                {item.title}
              </th>
              <td className="py-3 pr-4 text-body-sm text-fg-muted">
                {item.product}
              </td>
              <td className="py-3 pr-4 text-body-sm text-fg-muted">
                {item.type}
              </td>
              <td className="py-3 pr-4 font-mono tnum text-data">
                {item.version}
              </td>
              <td className="py-3 pr-4 text-body-sm text-fg-muted">
                {item.date}
              </td>
              <td className="py-3 pr-4 font-mono tnum text-data">
                {item.size}
              </td>
              <td className="py-3">
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-500 hover:text-brand-600"
                >
                  <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    Download
                    <span className="sr-only">
                      {` ${item.title}, ${item.format}, ${item.size}`}
                    </span>
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 ? (
        <p className="border-b border-border py-6 text-body text-fg-muted">
          No documents match these filters.
        </p>
      ) : null}
    </div>
  );
}
