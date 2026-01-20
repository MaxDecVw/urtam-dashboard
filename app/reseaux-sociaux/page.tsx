'use client';

import { Header } from '@/components/layout/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SocialMediaChart } from '@/components/charts/SocialMediaChart';
import { useDashboard } from '@/lib/context/DashboardContext';
import { Share2, TrendingUp, FileText, Target } from 'lucide-react';

export default function ReseauxSociauxPage() {
  const { urtamData } = useDashboard();

  if (!urtamData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Réseaux Sociaux"
        subtitle="Analyse détaillée de la présence digitale URTAM"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs globaux */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            title="Total Followers"
            value={urtamData.socialMedia.totalFollowers.toLocaleString()}
            subtitle="Tous réseaux"
            icon={<Share2 className="w-6 h-6" />}
            color="#0A66C2"
          />

          <KPICard
            title="Engagement Moyen"
            value={`${urtamData.socialMedia.averageEngagement}%`}
            subtitle="Taux global"
            icon={<TrendingUp className="w-6 h-6" />}
            color="#22c9b0"
          />

          <KPICard
            title="Publications Totales"
            value={urtamData.kpis.totalPosts}
            subtitle="Tous réseaux"
            icon={<FileText className="w-6 h-6" />}
            color="#E4405F"
          />

          <KPICard
            title="Plateformes Actives"
            value="5"
            subtitle="LinkedIn, Instagram, Facebook, YouTube, Twitter"
            icon={<Target className="w-6 h-6" />}
            color="#1877F2"
          />
        </div>

        {/* Graphique répartition */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des Followers par Plateforme
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Distribution du total de {urtamData.socialMedia.totalFollowers.toLocaleString()} followers
          </p>
          <SocialMediaChart data={urtamData.socialMedia.platforms} />
        </Card>

        {/* Tableau détaillé par plateforme */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Détails par Plateforme
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plateforme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compte
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Followers
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publications
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meilleur Contenu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urtamData.socialMedia.platforms.map((platform) => (
                  <tr key={platform.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: platform.color }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {platform.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {platform.account}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        {platform.followers.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                      {platform.posts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {platform.engagement > 0 ? (
                        <Badge variant="success">{platform.engagement}%</Badge>
                      ) : (
                        <Badge variant="default">0%</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {platform.bestContent || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {platform.format || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cartes d'analyse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Points forts */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span> Forces
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  LinkedIn: Engagement Exceptionnel
                </h4>
                <p className="text-sm text-green-700">
                  Taux d'engagement de 5.2% sur LinkedIn, largement supérieur à la moyenne du secteur (1-2%).
                  852 followers avec 15 publications.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Contenu Performant
                </h4>
                <p className="text-sm text-green-700">
                  Meilleure performance: "Vidéo Champ Champs-Élysées" sur LinkedIn. Format Post texte + photo fonctionne bien.
                </p>
              </div>
            </div>
          </Card>

          {/* Points à améliorer */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">!</span> Opportunités d'Amélioration
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Instagram: Potentiel Inexploité
                </h4>
                <p className="text-sm text-orange-700">
                  Seulement 74 followers et 0% d'engagement malgré 10 publications. Cibler une audience plus jeune avec du contenu visuel.
                </p>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Facebook: Effort Sans Résultat
                </h4>
                <p className="text-sm text-orange-700">
                  57 publications mais seulement 1 follower. Revoir la stratégie ou concentrer les efforts sur d'autres plateformes.
                </p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">
                  YouTube et Twitter: Quasi-Inactifs
                </h4>
                <p className="text-sm text-red-700">
                  YouTube: 4 followers, 4 vidéos. Twitter: 1 follower, 0 posts. Décider de développer ou abandonner ces canaux.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommandations */}
        <Card className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Recommandations Stratégiques
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Capitaliser sur LinkedIn
                </h4>
                <p className="text-sm text-blue-700">
                  Augmenter la fréquence de publication de 15 à 20-25 posts/mois. Votre engagement de 5.2% est exceptionnel, il faut en profiter.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">
                  Relancer Instagram avec du Contenu Vidéo
                </h4>
                <p className="text-sm text-purple-700">
                  Utiliser des Reels et Stories pour montrer les coulisses des formations. Viser 3-4 posts/semaine avec hashtags ciblés.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">
                  Rationaliser Facebook et Twitter
                </h4>
                <p className="text-sm text-orange-700">
                  ROI très faible sur ces plateformes. Envisager de rediriger les efforts vers LinkedIn et Instagram uniquement.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
