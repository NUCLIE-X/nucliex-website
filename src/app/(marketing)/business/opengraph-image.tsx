import { buildOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Business & enterprise storage — NUCLIEX";

export default function OpengraphImage() {
  return buildOgImage("Storage & IT for business");
}
