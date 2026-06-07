import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jairo Jessé",
  description: "sou uma mente criativa e que gosta de criar, no digital, manual e no rural.",
  openGraph: {
    title: "Jairo Jessé",
    description: "sou uma mente criativa e que gosta de criar, no digital, manual e no rural.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
