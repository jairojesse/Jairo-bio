export const TOKENS = {
  light: {
    bgPage: "#eceae5",
    bgCard: "#e2dfd9",
    bgCardHover: "#d8d4cd",
    bgCardSolid: "#d5d1ca",
    textPrimary: "#141210",
    textSecondary: "#6b6560",
    textMuted: "#a09a94",
    linkIconBg: "rgba(255,255,255,0.58)",
    linkIconFg: "#141210",
    borderSubtle: "rgba(0,0,0,0.07)",
    avatarBg: "#c8c4bc",
    shadowCard: "0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.07)",
    shadowHover: "0 4px 8px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.11)",
  },
  dark: {
    bgPage: "#131312",
    bgCard: "#1d1c1b",
    bgCardHover: "#272524",
    bgCardSolid: "#222120",
    textPrimary: "#f0ede8",
    textSecondary: "#7a7570",
    textMuted: "#4a4744",
    linkIconBg: "rgba(255,255,255,0.10)",
    linkIconFg: "#f0ede8",
    borderSubtle: "rgba(255,255,255,0.06)",
    avatarBg: "#2a2927",
    shadowCard: "0 1px 3px rgba(0,0,0,0.3), 0 4px 14px rgba(0,0,0,0.35)",
    shadowHover: "0 4px 8px rgba(0,0,0,0.4), 0 12px 28px rgba(0,0,0,0.45)",
  },
} as const;

export type Theme = keyof typeof TOKENS;
export type TokenSet = (typeof TOKENS)[Theme];
