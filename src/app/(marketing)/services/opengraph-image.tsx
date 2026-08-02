import { buildOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "IT services & support — NUCLIEX INFOSYS";

export default function OpengraphImage() {
  return buildOgImage("IT services & support");
}
