/**
 * Downloads registry — datasheets, guides, warranty cards (docs/04 §8).
 * Empty until real documents exist ({{TBD:documents}}, docs/09 #13):
 * the page renders an honest empty state, never placeholder PDFs.
 */

export interface DownloadItem {
  title: string;
  product: string;
  type: "Datasheet" | "Install guide" | "Warranty card" | "Driver";
  version: string;
  /** ISO date. */
  date: string;
  /** Human-readable size, e.g. "420 KB" — part of the accessible link name. */
  size: string;
  format: "PDF" | "ZIP";
  href: string;
}

export const downloads: DownloadItem[] = [];
