import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared OG image builder (docs/07 §1): navy background, reversed logo,
 * page title in the display face. Generated at build — every route group's
 * opengraph-image.tsx delegates here.
 */
export async function buildOgImage(title: string) {
  const [font, logo] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff",
      ),
    ),
    readFile(path.join(process.cwd(), "public/brand/nucliex-logo-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#0B1F3A",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- satori, not the DOM */}
      <img src={logoSrc} alt="" width={303} height={120} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "Space Grotesk",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 96,
            height: 4,
            backgroundColor: "#00C2FF",
          }}
        />
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: font, weight: 700, style: "normal" },
      ],
    },
  );
}
