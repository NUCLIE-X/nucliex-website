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

  const products = useMemo(() => [...new Set(items.map((i) => i.product))], [items]);
  const types = useMemo(() => [...new Set(items.map((i) => i.type))], [items]);

  const filtered = items.filter(
    (item) =>
      (product === "all" || item.product === product) && (type === "all" || item.type === type),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label htmlFor="filter-product" className="text-label text-fg-subtle mb-2 block uppercase">
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
          <label htmlFor="filter-type" className="text-label text-fg-subtle mb-2 block uppercase">
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
          <tr className="border-border border-b">
            {["Title", "Product", "Type", "Version", "Date", "Size", ""].map((heading, i) => (
              <th
                key={i}
                scope="col"
                className="text-label text-fg-subtle py-3 pr-4 text-left uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.href} className="border-border border-b">
              <th scope="row" className="text-body text-fg py-3 pr-4 text-left font-medium">
                {item.title}
              </th>
              <td className="text-body-sm text-fg-muted py-3 pr-4">{item.product}</td>
              <td className="text-body-sm text-fg-muted py-3 pr-4">{item.type}</td>
              <td className="text-data font-mono tnum py-3 pr-4">{item.version}</td>
              <td className="text-body-sm text-fg-muted py-3 pr-4">{item.date}</td>
              <td className="text-data font-mono tnum py-3 pr-4">{item.size}</td>
              <td className="py-3">
                <a
                  href={item.href}
                  className="text-brand-500 hover:text-brand-600 inline-flex items-center gap-1.5 font-medium"
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
        <p className="text-body text-fg-muted border-border border-b py-6">
          No documents match these filters.
        </p>
      ) : null}
    </div>
  );
}
