'use client';

import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const handleExportPDF = () => {
    alert('Export PDF - Fonctionnalité à venir');
  };

  const handleExportExcel = () => {
    alert('Export Excel - Fonctionnalité à venir');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Titre */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Filtres de date - À implémenter */}
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              3 derniers mois
            </Button>

            {/* Exports */}
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <Download className="w-4 h-4 mr-2" />
              Excel
            </Button>

            <Button variant="primary" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
