import { buildOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "NUCLIEX — SSDs & IT solutions engineered in India";

export default function OpengraphImage() {
  return buildOgImage("Storage you can stop thinking about.");
}
