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
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

