import { buildOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Support, warranty & downloads — NUCLIEX";

export default function OpengraphImage() {
  return buildOgImage("Support, warranty & downloads");
}
