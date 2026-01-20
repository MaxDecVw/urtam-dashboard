'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KPICard } from '@/components/dashboard/KPICard';
import { useDashboard } from '@/lib/context/DashboardContext';
import { Star, AlertTriangle, ThumbsUp, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  platform: string;
  comment: string;
  sentiment: string;
  rating: number;
  date: string | null;
  author: string | null;
}

interface ReputationData {
  reviews: {
    website: Review[];
    google: Review[];
    facebook: Review[];
    linkedin: Review[];
  };
  statistics: {
    total: number;
    positive: number;
    neutral: number;
    negative: number;
    averageRating: number;
    googleReviewsCount: number;
    websiteReviewsCount: number;
  };
  themes: Array<{
    theme: string;
    count: number;
    sentiment: string;
  }>;
}

export default function ReputationPage() {
  const { urtamData } = useDashboard();
  const [reputationData, setReputationData] = useState<ReputationData | null>(null);

  useEffect(() => {
    // Charger les avis depuis le fichier JSON
    fetch('/data/reputation-data.json')
      .then(res => res.json())
      .then(data => setReputationData(data))
      .catch(err => console.error('Erreur chargement avis:', err));
  }, []);

  if (!urtamData || !reputationData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const totalReviews = reputationData.statistics.total;
  const averageRating = reputationData.statistics.averageRating.toFixed(1);
  const positiveReviews = reputationData.statistics.positive;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Réputation & Avis"
        subtitle="Analyse des retours clients et de la présence en ligne"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Réputation */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            title="Avis Collectés"
            value={totalReviews.toString()}
            subtitle="Sur le site web"
            icon={<MessageSquare className="w-6 h-6" />}
            color="#22c9b0"
          />

          <KPICard
            title="Note Moyenne"
            value={averageRating}
            subtitle="Sur 5 étoiles"
            icon={<Star className="w-6 h-6" />}
            color="#FFD700"
          />

          <KPICard
            title="Avis Positifs"
            value={`${positiveReviews}/${totalReviews}`}
            subtitle="100% de satisfaction"
            icon={<ThumbsUp className="w-6 h-6" />}
            color="#22c55e"
          />

          <KPICard
            title="Avis Google"
            value={urtamData.kpis.avisGoogle.toString()}
            subtitle="⚠️ Critique"
            icon={<AlertTriangle className="w-6 h-6" />}
            color="#dc2626"
          />
        </div>

        {/* Alerte critique Google */}
        <Card className="mb-8 border-2 border-red-300 bg-red-50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                ALERTE: Aucun Avis Google
              </h3>
              <p className="text-sm text-red-800 mb-4">
                <strong>Impact critique:</strong> 0 avis Google affecte gravement la crédibilité en ligne et le référencement local.
                93% des consommateurs lisent les avis en ligne avant de choisir un prestataire. L'absence totale d'avis Google
                peut faire perdre jusqu'à 70% de clients potentiels.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="danger">Priorité #1</Badge>
                <Badge variant="danger">Perte de confiance</Badge>
                <Badge variant="danger">SEO impacté</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Avis clients existants */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Avis Clients ({totalReviews})
          </h3>

          <div className="space-y-6">
            {reputationData.reviews.website.map((review) => (
              <div key={review.id} className="p-6 bg-green-50 border border-green-200 rounded-lg">
                {/* En-tête avis */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author || 'Client anonyme'}</p>
                    <p className="text-sm text-gray-500">{review.date || 'Date non renseignée'}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Contenu avis */}
                <p className="text-gray-700 mb-4">{review.comment}</p>

                {/* Thèmes identifiés */}
                <div className="flex flex-wrap gap-2">
                  {reputationData.themes.map((theme, idx) => (
                    <Badge key={idx} variant="success">
                      {theme.theme}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Analyse des avis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Points forts identifiés */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">✓</span> Points Forts Reconnus
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Adaptabilité des Formateurs
                </h4>
                <p className="text-sm text-green-700">
                  Les clients soulignent la capacité des formateurs à adapter le contenu aux besoins spécifiques
                  et à répondre aux questions en temps réel.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Contenu Pratique et Concret
                </h4>
                <p className="text-sm text-green-700">
                  Les formations sont appréciées pour leur aspect pratique avec des exemples concrets
                  et des outils directement applicables en entreprise.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">
                  Satisfaction Totale
                </h4>
                <p className="text-sm text-green-700">
                  100% des avis collectés sont positifs, avec des notes de 4 et 5 étoiles.
                  Preuve d'une qualité de service constante.
                </p>
              </div>
            </div>
          </Card>

          {/* Comparaison concurrentielle */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comparaison Avis Google
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Décalez !</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">~50 avis Google</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">ImprO2</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">~35 avis Google</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">Arthémon</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">5.0/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">~20 avis Google</p>
              </div>

              <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-red-900">URTAM Formation</span>
                  <Badge variant="danger">0 avis</Badge>
                </div>
                <p className="text-sm text-red-700 font-semibold">
                  Désavantage compétitif majeur
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <strong>Impact:</strong> Les concurrents affichent entre 20 et 50 avis Google avec d'excellentes notes (4.8-5.0/5).
              L'absence d'avis URTAM crée un déficit de confiance immédiat.
            </p>
          </Card>
        </div>

        {/* Plan d'action */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🚀 Plan d'Action: Développer les Avis Google
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Mise en Place d'un Système de Sollicitation Automatique
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Envoyer un email automatique 2-3 jours après chaque formation avec un lien direct vers Google Reviews.
                  Taux de réponse attendu: 15-25%.
                </p>
                <div className="pl-4 border-l-2 border-blue-300">
                  <p className="text-xs text-blue-800 mb-1"><strong>Objectif:</strong> 5 avis/mois</p>
                  <p className="text-xs text-blue-800 mb-1"><strong>Outil:</strong> Intégrer dans le CRM ou email automatique</p>
                  <p className="text-xs text-blue-800"><strong>Timeline:</strong> Mise en place immédiate (Semaine 1)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Sollicitation Manuelle des 1,017 Personnes Formées
                </h4>
                <p className="text-sm text-purple-700 mb-3">
                  Campagne de relance auprès des anciens stagiaires satisfaits. Prioriser les 6 derniers mois pour maximiser le taux de réponse.
                </p>
                <div className="pl-4 border-l-2 border-purple-300">
                  <p className="text-xs text-purple-800 mb-1"><strong>Objectif:</strong> 50 avis en 3 mois</p>
                  <p className="text-xs text-purple-800 mb-1"><strong>Message:</strong> Email personnalisé + QR code direct</p>
                  <p className="text-xs text-purple-800"><strong>Timeline:</strong> Lancement Semaine 2, envoi progressif</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-2">
                  Incitation à Chaud en Fin de Formation
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  Demander aux participants de laisser un avis Google en direct à la fin de la formation (QR code affiché).
                  Profiter de l'enthousiasme immédiat.
                </p>
                <div className="pl-4 border-l-2 border-green-300">
                  <p className="text-xs text-green-800 mb-1"><strong>Objectif:</strong> Taux de conversion 30-40%</p>
                  <p className="text-xs text-green-800 mb-1"><strong>Support:</strong> QR code imprimé + slide de fin</p>
                  <p className="text-xs text-green-800"><strong>Timeline:</strong> Déploiement immédiat (Semaine 1)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 mb-2">
                  Créer une Landing Page "Témoignages"
                </h4>
                <p className="text-sm text-orange-700 mb-3">
                  Centraliser les 2 avis existants + futurs témoignages sur une page dédiée du site web.
                  Ajouter des témoignages vidéo si possible.
                </p>
                <div className="pl-4 border-l-2 border-orange-300">
                  <p className="text-xs text-orange-800 mb-1"><strong>Contenu:</strong> Avis texte + vidéos + chiffres clés (1,017 formés, 95% satisfaits)</p>
                  <p className="text-xs text-orange-800 mb-1"><strong>SEO:</strong> Optimiser pour "avis urtam formation"</p>
                  <p className="text-xs text-orange-800"><strong>Timeline:</strong> Création Semaines 2-3</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              📊 Objectifs Chiffrés - 3 Mois
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-600">Avis Google</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-primary">4.8+</p>
                <p className="text-sm text-gray-600">Note moyenne</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-2xl font-bold text-primary">Top 5</p>
                <p className="text-sm text-gray-600">Classement local SEO</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
