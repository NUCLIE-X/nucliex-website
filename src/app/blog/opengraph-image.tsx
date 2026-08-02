import { buildOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Storage & IT guides — NUCLIEX";

export default function OpengraphImage() {
  return buildOgImage("Storage & IT guides");
}
