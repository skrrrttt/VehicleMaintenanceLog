import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vehicle Maintenance Tracker',
  description: 'Track maintenance for your vehicles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-gray-900">
        {children}
      </body>
    </html>
  );
}
