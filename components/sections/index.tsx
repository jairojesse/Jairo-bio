"use client";

import { useState, useRef, useCallback } from "react";
import { useSquircle } from "@/hooks/useSquircle";
import { Card } from "@/components/ui/Card";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { TokenSet } from "@/lib/tokens";
import type { Profile as ProfileData, Social, Recommendation } from "@/lib/types";

export function SquircleAvatar({
  src,
  t,
  size = 80,
}: {
  src: string | null;
  t: TokenSet;
  size?: number;
}) {
  const { ref, svgClip, clipStyle } = useSquircle({ radius: 22 });
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        background: src ? `url(${src}) center/cover` : t.avatarBg,
        boxShadow: `inset 0 0 0 1px ${t.borderSubtle}`,
        ...clipStyle,
      }}
    >
      {svgClip}
    </div>
  );
}

export function Profile({ data, t }: { data: ProfileData; t: TokenSet }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {data.showAvatar && <SquircleAvatar src={data.avatar} t={t} size={82} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: t.textPrimary,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {data.name}
        </h1>
        {data.showBio && (
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: t.textSecondary,
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: 340,
            }}
          >
            {data.bio}
          </p>
        )}
      </div>
    </header>
  );
}

export function Section({
  title,
  showTitle = true,
  children,
  t,
}: {
  title?: string;
  showTitle?: boolean;
  children: React.ReactNode;
  t: TokenSet;
}) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {showTitle && title && (
        <h2
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "-0.01em",
            color: t.textPrimary,
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
      }}
    >
      {children}
    </div>
  );
}

export function RecommendationsScroll({
  items,
  t,
  sectionWidth,
}: {
  items: Recommendation[];
  t: TokenSet;
  sectionWidth: number;
}) {
  const halves = items.filter((i) => i.size === "half" && i.active);
  const fulls = items.filter((i) => i.size === "full" && i.active);
  const cardFullH = sectionWidth > 0 ? Math.round(sectionWidth * (3 / 8)) : 163;
  const scrollMaxH = Math.round(cardFullH * 1.55);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [showFade, setShowFade] = useState(fulls.length > 1);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / (cardFullH + 10));
    setActiveDot(Math.min(index, fulls.length - 1));
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
    setShowFade(!atBottom);
  }, [cardFullH, fulls.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {halves.length > 0 && (
        <Grid>
          {halves.map((r) => (
            <Card
              key={r.id}
              variant="recommendation"
              size="half"
              t={t}
              image={r.image}
              label={r.title}
              link={r.link}
            />
          ))}
        </Grid>
      )}
      {fulls.length > 0 && (
        <div style={{ position: "relative" }}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: scrollMaxH,
              overflowY: "auto",
              scrollSnapType: "y mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: 2,
            }}
          >
            {fulls.map((r) => (
              <div
                key={r.id}
                style={{ flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <Card
                  variant="recommendation"
                  size="full"
                  t={t}
                  image={r.image}
                  label={r.title}
                  link={r.link}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 52,
              background: `linear-gradient(to top, ${t.bgPage} 0%, transparent 100%)`,
              pointerEvents: "none",
              opacity: showFade ? 1 : 0,
              transition: "opacity 240ms",
            }}
          />

          {fulls.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 7,
                gap: 4,
              }}
            >
              {fulls.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeDot ? 14 : 4,
                    height: 4,
                    borderRadius: 2,
                    background: t.textMuted,
                    opacity: i === activeDot ? 0.8 : 0.3,
                    transition:
                      "width 240ms cubic-bezier(0.4,0,0.2,1), opacity 240ms",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ContactBar({
  socials,
  t,
}: {
  socials: Social[];
  t: TokenSet;
}) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  const items = [
    ...socials
      .filter((s) => s.active)
      .map((s) => ({ id: s.id, icon: s.icon, link: s.link, label: s.label })),
    { id: "email", icon: "Email", link: "mailto:oi@jairo.bio", label: "Email" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingTop: 8,
      }}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target={item.id === "email" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={item.label}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            color: hoveredId === item.id ? t.textSecondary : t.textMuted,
            transform: hoveredId === item.id ? "scale(1.15)" : "scale(1)",
            transition:
              "color 180ms, transform 180ms cubic-bezier(0.34,1.56,0.64,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <SocialIcon name={item.icon} color="currentColor" size={16} />
        </a>
      ))}
    </div>
  );
}

export function ThemeToggle({
  theme,
  onToggle,
  t,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
  t: TokenSet;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Tema atual: ${theme === "light" ? "claro" : "escuro"}`}
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: `1px solid ${t.borderSubtle}`,
        background: hovered ? t.bgCardHover : t.bgCard,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition:
          "background 180ms, transform 180ms cubic-bezier(0.34,1.56,0.64,1)",
        flexShrink: 0,
        marginTop: 4,
      }}
    >
      {theme === "light" ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.textSecondary}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.textSecondary}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
