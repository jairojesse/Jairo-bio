"use client";

import { useState, useRef, useEffect } from "react";
import { TOKENS } from "@/lib/tokens";
import {
  Profile,
  Section,
  RecommendationsScroll,
  ContactBar,
  ThemeToggle,
  Grid,
} from "@/components/sections";
import { Card } from "@/components/ui/Card";
import type { SiteContent } from "@/lib/types";

interface BioPageProps {
  content: SiteContent;
}

export function BioPage({ content }: BioPageProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageW, setPageW] = useState(520);
  const t = TOKENS[theme];
  const { profile, highlights, socials, recommendations, sections } = content;

  useEffect(() => {
    if (!pageRef.current) return;
    const ro = new ResizeObserver(([e]) =>
      setPageW(Math.round(e.contentRect.width))
    );
    ro.observe(pageRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bgPage,
        color: t.textPrimary,
        transition: "background 300ms, color 300ms",
      }}
    >
      <div
        ref={pageRef}
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "48px 36px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Profile data={profile} t={t} />
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
            t={t}
          />
        </div>

        {sections.highlights.active &&
          highlights.filter((h) => h.active).length > 0 && (
            <Section showTitle={false} t={t}>
              {highlights
                .filter((h) => h.active)
                .map((h) => (
                  <Card
                    key={h.id}
                    variant="highlight"
                    size="full"
                    t={t}
                    image={h.image}
                    link={h.link}
                  />
                ))}
            </Section>
          )}

        {sections.socials.active && (
          <Section
            showTitle={sections.socials.showTitle}
            title={sections.socials.title}
            t={t}
          >
            <Grid>
              {socials
                .filter((s) => s.active)
                .map((s) => (
                  <Card
                    key={s.id}
                    variant="social"
                    t={t}
                    icon={s.icon}
                    label={s.label}
                    link={s.link}
                  />
                ))}
            </Grid>
          </Section>
        )}

        {sections.recommendations.active && (
          <Section
            showTitle={sections.recommendations.showTitle}
            title={sections.recommendations.title}
            t={t}
          >
            <RecommendationsScroll
              items={recommendations}
              t={t}
              sectionWidth={pageW - 72}
            />
          </Section>
        )}

        <ContactBar socials={socials} t={t} />

        <footer
          style={{
            textAlign: "center",
            fontSize: 11,
            color: t.textMuted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          jairo.bio
        </footer>
      </div>
    </div>
  );
}
