"use client";

import { useState, useEffect } from "react";
import { useSquircle } from "@/hooks/useSquircle";
import { SocialIcon } from "./SocialIcon";
import type { TokenSet } from "@/lib/tokens";

interface CardProps {
  variant: "highlight" | "social" | "recommendation";
  size?: "half" | "full";
  t: TokenSet;
  image?: string | null;
  label?: string;
  icon?: string;
  link?: string;
}

function LinkArrow({ t }: { t: TokenSet }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: t.linkIconBg,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={t.linkIconFg}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </div>
  );
}

export function Card({
  variant,
  size = "half",
  t,
  image,
  label,
  icon,
  link = "#",
}: CardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(!image);
  const radius = variant === "highlight" ? 26 : 22;
  const { ref, svgClip, clipStyle } = useSquircle({ radius });
  const aspectRatio =
    variant === "highlight" || size === "full" ? "8 / 3" : "5 / 4";

  useEffect(() => {
    if (!image) return;
    setImgLoaded(false);
    const img = new Image();
    img.src = image;
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(true);
  }, [image]);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        aspectRatio,
        background: image ? `url(${image}) center/cover no-repeat` : t.bgCard,
        boxShadow: hovered ? t.shadowHover : t.shadowCard,
        transform: hovered
          ? "translateY(-2px) scale(1.005)"
          : "translateY(0) scale(1)",
        transition: [
          "box-shadow 240ms cubic-bezier(0.4,0,0.2,1)",
          "transform 240ms cubic-bezier(0.4,0,0.2,1)",
        ].join(", "),
        cursor: "pointer",
        overflow: "hidden",
        textDecoration: "none",
        gridColumn: size === "full" ? "1 / -1" : undefined,
        flexShrink: 0,
        ...clipStyle,
      }}
    >
      {svgClip}

      {image && !imgLoaded && (
        <>
          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: t.bgCard,
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${t.bgCardHover} 50%, transparent 100%)`,
                animation: "shimmer 1.4s infinite",
              }}
            />
          </div>
        </>
      )}

      <LinkArrow t={t} />

      {image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0)",
            transition: "background 240ms",
          }}
        />
      )}

      {variant === "social" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "12px 12px 13px",
            gap: 5,
          }}
        >
          <SocialIcon name={icon ?? ""} color={t.textPrimary} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: t.textPrimary,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              lineHeight: 1.2,
            }}
          >
            {label}
          </span>
        </div>
      )}

      {variant === "recommendation" && !image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "12px 12px 13px",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: t.bgCardSolid,
              marginBottom: 2,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: t.textPrimary,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              lineHeight: 1.3,
            }}
          >
            {label}
          </span>
        </div>
      )}

      {variant === "recommendation" && image && label && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "36px 13px 13px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {label}
          </span>
        </div>
      )}

      {variant === "highlight" && !image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: 14,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: t.textMuted,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            imagem ou vídeo do projeto
          </span>
        </div>
      )}
    </a>
  );
}
