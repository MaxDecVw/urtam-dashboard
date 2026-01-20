'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  DashboardContextType,
  UrtamData,
  CompetitorsData,
  ReputationData,
  SeoData,
} from '@/types';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    end: new Date(),
  });

  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([
    'decalez',
    'impro2',
    'arthemon',
  ]);

  const [urtamData, setUrtamData] = useState<UrtamData | null>(null);
  const [competitorsData, setCompetitorsData] = useState<CompetitorsData | null>(null);
  const [reputationData, setReputationData] = useState<ReputationData | null>(null);
  const [seoData, setSeoData] = useState<SeoData | null>(null);

  // Charger les données au montage
  useEffect(() => {
    const loadData = async () => {
      try {
        const [urtam, competitors, reputation, seo] = await Promise.all([
          import('@/lib/data/urtam-data.json').then((m) => m.default as UrtamData),
          import('@/lib/data/competitors-data.json').then((m) => m.default as CompetitorsData),
          import('@/lib/data/reputation-data.json').then((m) => m.default as ReputationData),
          import('@/lib/data/seo-data.json').then((m) => m.default as SeoData),
        ]);

        setUrtamData(urtam);
        setCompetitorsData(competitors);
        setReputationData(reputation);
        setSeoData(seo);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    loadData();
  }, []);

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const value: DashboardContextType = {
    dateRange,
    selectedCompetitors,
    urtamData,
    competitorsData,
    reputationData,
    seoData,
    setDateRange,
    toggleCompetitor,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard doit être utilisé à l\'intérieur d\'un DashboardProvider');
  }
  return context;
}
