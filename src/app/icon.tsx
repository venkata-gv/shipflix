import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0F",
          color: "#EDEDED",
          fontFamily: "system-ui",
          fontWeight: 900,
          fontSize: 14,
          letterSpacing: -0.5,
        }}
      >
        S<span style={{ color: "#E50914", marginLeft: -1 }}>F</span>
      </div>
    ),
    size,
  );
}
