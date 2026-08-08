import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Software & AI Engineer`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 35%, #1a0505 0%, #030303 70%)",
          color: "#f4f2f0",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Corner brackets, echoing the site's HUD chrome */}
        <div style={{ position: "absolute", top: 48, left: 48, width: 36, height: 36, borderLeft: "2px solid #ff2e2e", borderTop: "2px solid #ff2e2e", opacity: 0.7 }} />
        <div style={{ position: "absolute", top: 48, right: 48, width: 36, height: 36, borderRight: "2px solid #ff2e2e", borderTop: "2px solid #ff2e2e", opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: 48, left: 48, width: 36, height: 36, borderLeft: "2px solid #ff2e2e", borderBottom: "2px solid #ff2e2e", opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: 48, right: 48, width: 36, height: 36, borderRight: "2px solid #ff2e2e", borderBottom: "2px solid #ff2e2e", opacity: 0.7 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ff2e2e",
            marginBottom: 28,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#ff2e2e" }} />
          System Online
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#ff8080",
          }}
        >
          {profile.roles[0]}
        </div>
      </div>
    ),
    { ...size }
  );
}
