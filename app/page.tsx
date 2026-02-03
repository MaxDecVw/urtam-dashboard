'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from '@/components/CountUp';

interface DashboardData {
  urtam: {
    linkedinFollowers: number;
    linkedinPosts: number;
    engagementRate: number;
  };
  stephaneMichel: {
    linkedinFollowers: number;
  };
  leader: {
    name: string;
    linkedinFollowers: number;
  };
  objectifs: {
    followersM6: number;
    postsParMois: number;
    engagementCible: number;
    contactsUrtam: number;
  };
  suiviMensuel: {
    mois: string[];
    abonnes: (number | null)[];
    posts: (number | null)[];
    engagement: (number | null)[];
  };
}

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch('/data/dashboard-data.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Erreur chargement données:', err));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#5B9BD5' }}></div>
          <p className="mt-4" style={{ color: '#888888' }}>Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Préparer les données pour les graphiques
  const chartDataFollowers = data.suiviMensuel.mois.map((mois, index) => ({
    mois,
    abonnes: data.suiviMensuel.abonnes[index]
  }));

  const chartDataActivity = data.suiviMensuel.mois.map((mois, index) => ({
    mois,
    posts: data.suiviMensuel.posts[index],
    engagement: data.suiviMensuel.engagement[index]
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="bg-white" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#2E5A8B' }}>
              Tableau de bord - Urtam Formation
            </h1>
            <p className="mt-1 text-base" style={{ color: '#888888' }}>
              Version 1.0
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#5B9BD5', color: '#FFFFFF' }}
          >
            Objectifs 2026
          </Link>
          <Link
            href="/resultats"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#F5F5F5', color: '#333333', border: '1px solid #E0E0E0' }}
          >
            Projections 2026
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Objectif stratégique - Card */}
        <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <p className="text-xl font-bold" style={{ color: '#2E5A8B' }}>
            Objectif 2026 : Faire connaître Urtam indépendamment de Stéphane Michel
          </p>
        </div>

        {/* BLOC 1 : Situation actuelle */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Situation actuelle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Abonnés LinkedIn Urtam</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={data.urtam.linkedinFollowers} /></p>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Abonnés LinkedIn Stéphane Michel</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={data.stephaneMichel.linkedinFollowers} /></p>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Témoignages clients</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={2} /></p>
            </div>

          </div>
        </section>

        {/* BLOC 2 : KPIs à suivre */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            KPIs à suivre
          </h2>
          <div className="bg-white overflow-hidden" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead style={{ backgroundColor: '#F5F5F5' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider" style={{ color: '#888888' }}>
                      KPI
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider" style={{ color: '#888888' }}>
                      Valeur actuelle
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider" style={{ color: '#888888' }}>
                      Objectif 6 mois
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{ borderColor: '#E0E0E0' }}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Abonnés LinkedIn Urtam
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.urtam.linkedinFollowers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.objectifs.followersM6}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Posts Urtam / mois
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.urtam.linkedinPosts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.objectifs.postsParMois}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Taux d'engagement Urtam
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.urtam.engagementRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.objectifs.engagementCible}%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Demandes mentionnant Urtam (%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      0%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-2xl font-bold" style={{ color: '#2E5A8B' }}>
                      {data.objectifs.contactsUrtam}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BLOC 3 : Suivi mensuel */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Suivi mensuel
          </h2>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Graphique 1 : Évolution des abonnés */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#333333' }}>
                Évolution des abonnés Urtam
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartDataFollowers} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fill: '#888888', fontSize: 13 }}
                    label={{ value: 'Mois', position: 'bottom', offset: 15, style: { fontSize: 14, fontWeight: 500, fill: '#888888' } }}
                  />
                  <YAxis
                    tick={{ fill: '#888888', fontSize: 13 }}
                    width={50}
                    label={{ value: 'Nombre d\'abonnés', angle: -90, position: 'outside', dx: -30, style: { fontSize: 14, fontWeight: 500, fill: '#888888', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="abonnes"
                    stroke="#5B9BD5"
                    strokeWidth={2}
                    dot={{ fill: '#5B9BD5', r: 4 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Graphique 2 : Posts publiés par mois */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#333333' }}>
                Posts publiés par mois
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartDataActivity} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fill: '#888888', fontSize: 13 }}
                    label={{ value: 'Mois', position: 'bottom', offset: 15, style: { fontSize: 14, fontWeight: 500, fill: '#888888' } }}
                  />
                  <YAxis
                    tick={{ fill: '#888888', fontSize: 13 }}
                    width={50}
                    label={{ value: 'Nombre de posts', angle: -90, position: 'outside', dx: -30, style: { fontSize: 14, fontWeight: 500, fill: '#888888', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#5B9BD5"
                    strokeWidth={2}
                    dot={{ fill: '#5B9BD5', r: 4 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tableau de suivi */}
          <div className="bg-white overflow-hidden" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead style={{ backgroundColor: '#F5F5F5' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider" style={{ color: '#888888' }}>
                      Métrique
                    </th>
                    {data.suiviMensuel.mois.map((mois, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider"
                        style={{ color: '#888888' }}
                      >
                        {mois}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y" style={{ borderColor: '#E0E0E0' }}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Nombre d'abonnés
                    </td>
                    {data.suiviMensuel.abonnes.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val !== null ? val : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Nombre de posts publiés
                    </td>
                    {data.suiviMensuel.posts.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val !== null ? val : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Taux engagement (en %)
                    </td>
                    {data.suiviMensuel.engagement.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val !== null ? `${val}%` : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BLOC 4 : Insights */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Insights
          </h2>

          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-base" style={{ color: '#333333', lineHeight: '1.6' }}>
                La communication repose exclusivement sur Stéphane Michel, ce qui limite l'identification d'Urtam comme une marque autonome.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-base" style={{ color: '#333333', lineHeight: '1.6' }}>
                L'audience existante sur la page LinkedIn de Stéphane Michel constitue un levier immédiat pour la notoriété d'Urtam.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
