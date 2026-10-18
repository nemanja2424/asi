import { ImageResponse } from "next/og";

export const alt = "ASI Solutions — web design, social media, content creation and AI automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#080808", color: "#f5efe2", fontFamily: "sans-serif", borderBottom: "10px solid #d4af37" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 36, color: "#d4af37", fontWeight: 700 }}>ASI SOLUTIONS</span>
          <span style={{ fontSize: 22, color: "#b6b0a5" }}>asi-solution.com</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, letterSpacing: "-3px", lineHeight: 1.08 }}>
          <span>Creative thinking.</span>
          <span style={{ color: "#d4af37" }}>Connected digital growth.</span>
        </div>
        <div style={{ display: "flex", fontSize: 25, color: "#d1cabd" }}>Web Design · Social Media · Content · AI Automation</div>
      </div>
    ),
    size,
  );
}
