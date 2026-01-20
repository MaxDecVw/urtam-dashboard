'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ComparisonChart } from '@/components/charts/ComparisonChart';
import { useDashboard } from '@/lib/context/DashboardContext';
import { Users, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';

export default function ConcurrencePage() {
  const { urtamData, competitorsData } = useDashboard();

  if (!urtamData || !competitorsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const leaderFollowers = Math.max(...competitorsData.competitors.map(c => c.totalFollowers));
  const gapPercentage = Math.round(((leaderFollowers - urtamData.kpis.totalFollowers) / leaderFollowers) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Analyse Concurrentielle"
        subtitle="Benchmark des concurrents directs d'URTAM Formation"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs comparatifs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            title="Position Marché"
            value="4ème"
            subtitle="Sur 4 acteurs analysés"
            icon={<Target className="w-6 h-6" />}
            color="#FF6B6B"
          />

          <KPICard
            title="Écart avec Leader"
            value={`-${gapPercentage}%`}
            subtitle={`${(leaderFollowers - urtamData.kpis.totalFollowers).toLocaleString()} followers d'écart`}
            icon={<TrendingDown className="w-6 h-6" />}
            color="#FFA500"
          />

          <KPICard
            title="Concurrents Analysés"
            value="3"
            subtitle="Décalez !, ImprO2, Arthémon"
            icon={<Users className="w-6 h-6" />}
            color="#0A66C2"
          />

          <KPICard
            title="Nos Followers"
            value={urtamData.kpis.totalFollowers.toLocaleString()}
            subtitle="Total tous réseaux"
            icon={<AlertTriangle className="w-6 h-6" />}
            color="#22c9b0"
          />
        </div>

        {/* Graphique de comparaison */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Comparaison du Nombre de Followers
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Benchmark total des followers tous réseaux sociaux confondus
          </p>
          <ComparisonChart
            competitors={competitorsData.competitors}
            urtamFollowers={urtamData.kpis.totalFollowers}
          />
        </Card>

        {/* Tableau détaillé des concurrents */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Détails des Concurrents
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classement Google
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Followers
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LinkedIn
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facebook
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instagram
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Twitter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offre
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Ligne URTAM */}
                <tr className="bg-primary bg-opacity-5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-primary">URTAM Formation</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge variant="default">N/A</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-lg font-semibold text-primary">
                      {urtamData.kpis.totalFollowers.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    852
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    74
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    1
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Formation professionnelle
                  </td>
                </tr>

                {/* Lignes concurrents */}
                {competitorsData.competitors
                  .sort((a, b) => b.totalFollowers - a.totalFollowers)
                  .map((competitor) => (
                    <tr key={competitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">
                          {competitor.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Badge
                          variant={
                            competitor.googleRanking === 1
                              ? 'success'
                              : competitor.googleRanking <= 3
                              ? 'info'
                              : 'default'
                          }
                        >
                          #{competitor.googleRanking}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          {competitor.totalFollowers.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                        {competitor.platforms.linkedin?.toLocaleString() || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                        {competitor.platforms.facebook?.toLocaleString() || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                        {competitor.platforms.instagram?.toLocaleString() || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                        {competitor.platforms.twitter?.toLocaleString() || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {competitor.offre}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Analyse par plateforme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              LinkedIn: Notre Meilleur Atout
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-900">URTAM</span>
                <span className="text-lg font-bold text-primary">852</span>
              </div>
              {competitorsData.competitors
                .filter(c => c.platforms.linkedin)
                .sort((a, b) => (b.platforms.linkedin || 0) - (a.platforms.linkedin || 0))
                .map(competitor => (
                  <div key={competitor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{competitor.name}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {competitor.platforms.linkedin?.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Position compétitive sur LinkedIn avec 852 followers, mais Décalez ! domine avec 1,818.
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Gap Analysis
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-900">Écart Total avec Leader</h4>
                  <Badge variant="danger">-{gapPercentage}%</Badge>
                </div>
                <p className="text-sm text-red-700">
                  {(leaderFollowers - urtamData.kpis.totalFollowers).toLocaleString()} followers de retard sur Décalez ! (leader avec {leaderFollowers.toLocaleString()} followers)
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-orange-900">Position SEO</h4>
                  <Badge variant="warning">Non classé</Badge>
                </div>
                <p className="text-sm text-orange-700">
                  Décalez ! est #1 sur Google, Arthémon #2, ImprO2 #7. URTAM n'apparaît pas dans le top 10.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-900">Facebook & Instagram</h4>
                  <Badge variant="warning">Critique</Badge>
                </div>
                <p className="text-sm text-yellow-700">
                  Les concurrents ont entre 480 et 1,300 followers Facebook. URTAM: 1 follower seulement.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommandations stratégiques */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 Actions Prioritaires pour Rattraper le Retard
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-1">
                  SEO: Apparaître dans le Top 10 Google
                </h4>
                <p className="text-sm text-red-700">
                  Priorité absolue: optimiser le référencement naturel pour être visible. Les 3 concurrents sont tous classés #1, #2 et #7.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">
                  Multiplier par 4 la Présence Digitale
                </h4>
                <p className="text-sm text-orange-700">
                  Objectif: passer de 932 à ~3,500 followers pour rattraper le leader Décalez !. Focus LinkedIn et développer Instagram.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Analyser les Best Practices de Décalez !
                </h4>
                <p className="text-sm text-blue-700">
                  Étudier leur stratégie de contenu (#1 Google, 3,772 followers, offre théâtre/improvisation). S'inspirer sans copier.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
