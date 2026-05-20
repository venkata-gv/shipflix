import { ImageResponse } from "next/og";

export const alt = "ShipFlix — Streaming production-grade AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(at 25% 25%, #1a0507 0%, #0B0B0F 70%), linear-gradient(135deg, #0B0B0F 0%, #14040A 100%)",
          color: "#EDEDED",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C9A961",
          }}
        >
          PORTFOLIO · BY VENKATA SURENDRA REDDY G
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 220,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -6,
              display: "flex",
            }}
          >
            <span>SHIP</span>
            <span style={{ color: "#E50914" }}>F</span>
            <span>LIX</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#9A9AA3",
              maxWidth: 900,
            }}
          >
            Streaming production-grade AI · 6 shipped GenAI projects · Token-aware engineering
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9A9AA3",
          }}
        >
          <span>Forward Deployed Engineer · AI Engineer</span>
          <span style={{ color: "#5BE0E0" }}>shipflix.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
