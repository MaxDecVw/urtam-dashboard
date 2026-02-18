import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'URTAM Dashboard - Tableau de bord KPI',
  description: 'Tableau de bord stratégique pour suivre la construction de la marque URTAM Formation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
