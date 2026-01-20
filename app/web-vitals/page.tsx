'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KPICard } from '@/components/dashboard/KPICard';
import { CircularScore } from '@/components/charts/CircularScore';
import { Smartphone, Monitor, Gauge, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricValue {
  value: number;
  unit: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface Metric {
  id: string;
  name: string;
  description: string;
  mobile: MetricValue;
  desktop: MetricValue;
  thresholds: {
    good: number;
    needsImprovement: number;
  };
}

interface WebVitalsData {
  metrics: Metric[];
  summary: {
    mobile: {
      good: number;
      needsImprovement: number;
      poor: number;
      score: number;
    };
    desktop: {
      good: number;
      needsImprovement: number;
      poor: number;
      score: number;
    };
  };
}

export default function WebVitalsPage() {
  const [vitalsData, setVitalsData] = useState<WebVitalsData | null>(null);

  useEffect(() => {
    fetch('/data/web-core-vitals-data.json')
      .then(res => res.json())
      .then(data => setVitalsData(data))
      .catch(err => console.error('Erreur chargement Web Core Vitals:', err));
  }, []);

  if (!vitalsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return '#22c55e';
      case 'needs-improvement':
        return '#f59e0b';
      case 'poor':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'success';
      case 'needs-improvement':
        return 'warning';
      case 'poor':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'Bon';
      case 'needs-improvement':
        return 'À améliorer';
      case 'poor':
        return 'Mauvais';
      default:
        return 'N/A';
    }
  };

  // Calculer les scores par métrique (0-100)
  const getMetricScore = (metric: Metric, device: 'mobile' | 'desktop'): number => {
    const value = device === 'mobile' ? metric.mobile.value : metric.desktop.value;
    const rating = device === 'mobile' ? metric.mobile.rating : metric.desktop.rating;

    if (rating === 'good') return 100;
    if (rating === 'poor') return 40;
    return 70; // needs-improvement
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Web Core Vitals"
        subtitle="Performance et expérience utilisateur du site URTAM Formation"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Scores globaux */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
          <KPICard
            title="Score Mobile"
            value={vitalsData.summary.mobile.score.toString()}
            subtitle="Sur 100"
            icon={<Smartphone className="w-6 h-6" />}
            color={vitalsData.summary.mobile.score >= 90 ? '#22c55e' : vitalsData.summary.mobile.score >= 50 ? '#f59e0b' : '#ef4444'}
          />

          <KPICard
            title="Score Desktop"
            value={vitalsData.summary.desktop.score.toString()}
            subtitle="Sur 100"
            icon={<Monitor className="w-6 h-6" />}
            color={vitalsData.summary.desktop.score >= 90 ? '#22c55e' : vitalsData.summary.desktop.score >= 50 ? '#f59e0b' : '#ef4444'}
          />
        </div>

        {/* Tableau détaillé des métriques */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Détail des Métriques Core Web Vitals
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Métrique
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desktop
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seuil "Bon"
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vitalsData.metrics.map((metric) => (
                  <tr key={metric.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{metric.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{metric.id.toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {metric.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg font-bold" style={{ color: getRatingColor(metric.mobile.rating) }}>
                          {metric.mobile.value}{metric.mobile.unit}
                        </span>
                        <Badge variant={getRatingBadge(metric.mobile.rating) as any}>
                          {getRatingLabel(metric.mobile.rating)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg font-bold" style={{ color: getRatingColor(metric.desktop.rating) }}>
                          {metric.desktop.value}{metric.desktop.unit}
                        </span>
                        <Badge variant={getRatingBadge(metric.desktop.rating) as any}>
                          {getRatingLabel(metric.desktop.rating)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      &lt; {metric.thresholds.good}{metric.mobile.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Analyse et recommandations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Points positifs */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span> Points Forts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Excellente Performance Desktop
                </h4>
                <p className="text-sm text-green-700">
                  Score de {vitalsData.summary.desktop.score}/100 sur desktop avec 4 métriques au vert.
                  FCP à 0,7s et LCP à 1,5s sont bien en-dessous des seuils recommandés.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Stabilité Visuelle Parfaite (CLS)
                </h4>
                <p className="text-sm text-green-700">
                  CLS de 0.01 sur mobile et 0.011 sur desktop - aucun décalage visuel intempestif.
                  Excellente expérience utilisateur sur ce critère.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Aucun Blocage JavaScript (TBT)
                </h4>
                <p className="text-sm text-green-700">
                  Total Blocking Time à 0ms sur mobile et desktop. Le site reste parfaitement interactif pendant le chargement.
                </p>
              </div>
            </div>
          </Card>

          {/* Points critiques */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">✗</span> Problèmes Critiques
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-red-900">FCP Mobile: 3,0s</h4>
                  <Badge variant="danger">Critique</Badge>
                </div>
                <p className="text-sm text-red-700">
                  First Contentful Paint à 3,0s sur mobile dépasse le seuil de 1,8s.
                  67% plus lent que recommandé. Les utilisateurs voient une page blanche trop longtemps.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-red-900">LCP Mobile: 4,8s</h4>
                  <Badge variant="danger">Critique</Badge>
                </div>
                <p className="text-sm text-red-700">
                  Largest Contentful Paint à 4,8s sur mobile - 92% plus lent que le seuil de 2,5s.
                  Impact SEO majeur et risque élevé d'abandon utilisateur.
                </p>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-red-900">Speed Index Mobile: 5,1s</h4>
                  <Badge variant="danger">Critique</Badge>
                </div>
                <p className="text-sm text-red-700">
                  Speed Index à 5,1s sur mobile dépasse le seuil de 3,4s.
                  Le contenu s'affiche progressivement de manière trop lente.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
