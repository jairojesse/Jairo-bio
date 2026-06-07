interface SocialIconProps {
  name: string;
  color: string;
  size?: number;
}

export function SocialIcon({ name, color, size = 24 }: SocialIconProps) {
  const d = { fill: color, width: size, height: size };
  const s = {
    width: size,
    height: size,
    fill: "none" as const,
    stroke: color,
    strokeWidth: "1.8",
  };

  const icons: Record<string, React.ReactNode> = {
    YouTube: (
      <svg {...d} viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
    Instagram: (
      <svg {...s} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    Behance: (
      <svg {...d} viewBox="0 0 24 24">
        <path d="M7.5 11.5c1.38 0 2.5-1.12 2.5-2.5S8.88 6.5 7.5 6.5H2v11h5.8c1.5 0 2.7-1.2 2.7-2.7 0-1.18-.76-2.18-1.83-2.54A2.5 2.5 0 0 0 7.5 11.5zM4 8.5h3c.55 0 1 .45 1 1s-.45 1-1 1H4v-2zm3.5 7H4v-2.5h3.5c.69 0 1.25.56 1.25 1.25S8.19 15.5 7.5 15.5zM14.5 7h5v1.5h-5V7zm6.5 6.5h-7c0 1.38 1.12 2.5 2.5 2.5.83 0 1.56-.4 2-1h2.3A4.5 4.5 0 0 1 16.5 18C14.02 18 12 15.98 12 13.5S14.02 9 16.5 9s4.5 2.02 4.5 4.5z" />
        <circle cx="16.5" cy="13.5" r="1.5" />
      </svg>
    ),
    LinkedIn: (
      <svg {...d} viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    Email: (
      <svg {...s} viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  };

  return <>{icons[name] ?? null}</>;
}
