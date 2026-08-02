import { Fragment } from "react";
import {
  specGroupLabels,
  specGroupOrder,
  type SpecGroup,
  type SpecRow,
} from "@/data/products";

type SpecTableProps = {
  specs: SpecRow[];
  groupOrder?: SpecGroup[];
  /** Extra table-level footnotes appended after per-row notes. */
  footnotes?: string[];
  caption?: string;
  className?: string;
};

/**
 * A real, grouped <table> (docs/06 §3): th scope=row labels, mono tabular
 * values, hairline row borders, no zebra striping. Footnotes carry the
 * measured-conditions honesty the brand trades on.
 */
export function SpecTable({
  specs,
  groupOrder = specGroupOrder,
  footnotes = [],
  caption = "Product specifications",
  className,
}: SpecTableProps) {
  const groups = groupOrder.filter((group) =>
    specs.some((row) => row.group === group),
  );
  const rowNotes = specs
    .filter((row) => row.note)
    .map((row) => row.note as string);
  const allNotes = [...rowNotes, ...footnotes];

  return (
    <div className={className}>
      <table className="w-full border-collapse">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {groups.map((group) => (
            <Fragment key={group}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={2}
                  className="pt-8 pb-3 text-left text-label text-fg-subtle uppercase first:pt-0"
                >
                  {specGroupLabels[group]}
                </th>
              </tr>
              {specs
                .filter((row) => row.group === group)
                .map((row) => {
                  const noteIndex = row.note
                    ? rowNotes.indexOf(row.note) + 1
                    : null;
                  return (
                    <tr
                      key={`${group}-${row.label}`}
                      className="border-b border-border"
                    >
                      <th
                        scope="row"
                        className="w-1/2 py-3 pr-4 text-left text-body font-normal text-fg-muted"
                      >
                        {row.label}
                      </th>
                      <td className="py-3 font-mono tnum text-data text-fg">
                        {row.value}
                        {noteIndex ? (
                          <sup className="ml-1">
                            <span className="sr-only">note </span>
                            {noteIndex}
                          </sup>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
            </Fragment>
          ))}
        </tbody>
      </table>
      {allNotes.length > 0 ? (
        <ol className="mt-4 space-y-1 text-body-sm text-fg-subtle">
          {allNotes.map((note, i) => (
            <li key={note}>
              <sup aria-hidden="true">{i + 1}</sup> {note}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
