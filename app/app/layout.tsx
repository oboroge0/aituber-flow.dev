import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AITuberFlow',
  description: 'Build AI-powered virtual streamers with a visual workflow editor',
};

/**
 * Root Layout
 *
 * Minimal root layout. Route-specific layouts handle their own styling:
 * - (editor)/layout.tsx - Editor pages
 * - (overlay)/layout.tsx - Streaming overlays
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
