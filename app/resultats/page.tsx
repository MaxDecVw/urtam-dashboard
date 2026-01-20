'use client';

import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from '@/components/CountUp';

export default function ResultatsPage() {
  // Données de simulation pour 6 mois
  const simulationData = {
    mois: ['Mois 1', 'Mois 2', 'Mois 3', 'Mois 4', 'Mois 5', 'Mois 6'],
    abonnes: [11, 35, 78, 142, 245, 387],
    posts: [2, 4, 6, 8, 7, 9],
    engagement: [1.2, 5.2, 4.8, 4.3, 3.9, 4.8]
  };

  // Préparer les données pour les graphiques
  const chartDataFollowers = simulationData.mois.map((mois, index) => ({
    mois,
    abonnes: simulationData.abonnes[index]
  }));

  const chartDataEngagement = simulationData.mois.map((mois, index) => ({
    mois,
    engagement: simulationData.engagement[index]
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="bg-white" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#2E5A8B' }}>
              Simulation - Résultats 6 mois
            </h1>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#F5F5F5', color: '#333333', border: '1px solid #E0E0E0' }}
          >
            Objectifs 2026
          </Link>
          <Link
            href="/resultats"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: '#5B9BD5', color: '#FFFFFF' }}
          >
            Projections 2026
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* SECTION 1 : Résumé des résultats */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Résumé des résultats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Abonnés Urtam</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={387} /></p>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Nombre de posts publiés</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={36} /></p>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Taux d'engagement</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={4.0} decimals={1} suffix="%" /></p>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <p className="text-sm mb-1" style={{ color: '#888888' }}>Objectif abonnés</p>
              <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}><CountUp end={1000} /></p>
            </div>

          </div>
        </section>

        {/* SECTION 2 : Graphiques d'évolution */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Évolution sur 6 mois
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Graphique 2 : Taux d'engagement par mois */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#333333' }}>
                Taux d'engagement par mois
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartDataEngagement} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fill: '#888888', fontSize: 13 }}
                    label={{ value: 'Mois', position: 'bottom', offset: 15, style: { fontSize: 14, fontWeight: 500, fill: '#888888' } }}
                  />
                  <YAxis
                    tick={{ fill: '#888888', fontSize: 13 }}
                    width={50}
                    label={{ value: 'Taux d\'engagement (%)', angle: -90, position: 'outside', dx: -30, style: { fontSize: 14, fontWeight: 500, fill: '#888888', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value}%`, 'Engagement']}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#5B9BD5"
                    strokeWidth={2}
                    dot={{ fill: '#5B9BD5', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* SECTION 3 : Tableau récapitulatif */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Tableau récapitulatif
          </h2>
          <div className="bg-white overflow-hidden" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead style={{ backgroundColor: '#F5F5F5' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider" style={{ color: '#888888' }}>
                      Métrique
                    </th>
                    {simulationData.mois.map((mois, index) => (
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
                    {simulationData.abonnes.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Nombre de posts publiés
                    </td>
                    {simulationData.posts.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium" style={{ color: '#333333' }}>
                      Taux engagement (en %)
                    </td>
                    {simulationData.engagement.map((val, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-center text-base"
                        style={{ color: '#333333' }}
                      >
                        {val}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4 : Insights */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333333' }}>
            Insights
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1 : Progression vers l'objectif */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#333333' }}>Progression vers l'objectif</h3>
              <div className="flex items-end justify-between mb-3">
                <p className="text-4xl font-bold" style={{ color: '#2E5A8B' }}>387</p>
                <p className="text-lg mb-1" style={{ color: '#888888' }}>/ 400 abonnés</p>
              </div>
              <div className="w-full h-4 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                <div className="h-4 rounded-full" style={{ width: '97%', backgroundColor: '#5B9BD5' }}></div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#888888' }}>97% de l'objectif atteint</p>
            </div>

            {/* Card 2 : Qui publie ? */}
            <div className="bg-white p-6" style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#333333' }}>Qui publie ?</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-medium" style={{ color: '#333333' }}>Stéphane</p>
                    <p className="text-base font-bold" style={{ color: '#2E5A8B' }}>25%</p>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                    <div className="h-3 rounded-full" style={{ width: '25%', backgroundColor: '#5B9BD5' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-medium" style={{ color: '#333333' }}>Urtam</p>
                    <p className="text-base font-bold" style={{ color: '#2E5A8B' }}>75%</p>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#E0E0E0' }}>
                    <div className="h-3 rounded-full" style={{ width: '75%', backgroundColor: '#5B9BD5' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
