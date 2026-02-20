'use client';

import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import CountUp from '@/components/CountUp';
import dashboardData from '@/lib/data/dashboard-data.json';

export default function ResultatsPage() {
  const data = dashboardData.projections;
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [capturing, setCapturing] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!dashboardRef.current) return;
    setCapturing(true);
    try {
      const dataUrl = await toPng(dashboardRef.current, {
        backgroundColor: '#F5F5F5',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = 'dashboard-projections-2026.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur capture:', err);
    } finally {
      setCapturing(false);
    }
  }, []);

  const chartDataFollowers = data.simulationMensuelle.mois.map((mois, index) => ({
    mois,
    abonnes: data.simulationMensuelle.abonnes[index]
  }));

  const chartDataEngagement = data.simulationMensuelle.mois.map((mois, index) => ({
    mois,
    engagement: data.simulationMensuelle.engagement[index]
  }));

  return (
    <div ref={dashboardRef} className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-urtam" style={{ color: '#032b77' }}>
            Simulation <span className="font-light text-gray-300 mx-1">|</span> Résultats 6 mois
          </h1>
          <button
            onClick={handleDownload}
            disabled={capturing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {capturing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {capturing ? 'Capture...' : 'Télécharger'}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
          >
            Objectifs 2026
          </Link>
          <Link
            href="/resultats"
            className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-urtam text-urtam transition-colors"
            style={{ borderColor: '#032b77', color: '#032b77' }}
          >
            Projections 2026
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* Résumé des résultats */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Résumé des résultats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Abonnés Urtam</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.resume.abonnes} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Nombre de posts publiés</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.resume.posts} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Taux d&apos;engagement</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.resume.engagement} decimals={1} suffix="%" /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Objectif abonnés</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.resume.objectifAbonnes} /></p>
            </div>
          </div>
        </section>

        {/* Evolution des KPIs */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Evolution des KPIs
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    KPI
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    Résultats obtenus
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.kpiResultats.map((row, index) => (
                  <tr key={index} className={index < data.kpiResultats.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.kpi}</td>
                    <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{row.valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Évolution sur 6 mois */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Évolution sur 6 mois
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Graphique abonnés */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-base font-medium text-gray-900 mb-6">
                Évolution des abonnés Urtam
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartDataFollowers} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="0" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fill: '#9CA3AF', fontSize: 12, dy: 10 }}
                    axisLine={{ stroke: '#D1D5DB' }}
                    tickLine={false}
                    label={{ value: 'Mois', position: 'bottom', offset: 10, style: { fontSize: 12, fill: '#9CA3AF' } }}
                  />
                  <YAxis
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                    label={{ value: "Nombre d'abonnés", angle: -90, position: 'outside', dx: -25, style: { fontSize: 12, fill: '#9CA3AF', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="abonnes"
                    stroke="#032b77"
                    strokeWidth={2.5}
                    dot={{ fill: '#032b77', r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Graphique engagement */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-base font-medium text-gray-900 mb-6">
                Taux d&apos;engagement par mois
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartDataEngagement} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                  <CartesianGrid stroke="#E5E7EB" strokeDasharray="0" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fill: '#9CA3AF', fontSize: 12, dy: 10 }}
                    axisLine={{ stroke: '#D1D5DB' }}
                    tickLine={false}
                    label={{ value: 'Mois', position: 'bottom', offset: 10, style: { fontSize: 12, fill: '#9CA3AF' } }}
                  />
                  <YAxis
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                    label={{ value: "Taux d'engagement (%)", angle: -90, position: 'outside', dx: -25, style: { fontSize: 12, fill: '#9CA3AF', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}
                    formatter={(value: number) => [`${value}%`, 'Engagement']}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#032b77"
                    strokeWidth={2.5}
                    dot={{ fill: '#032b77', r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tableau seuils critiques & actions */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-500">
                    Métrique
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-semibold text-gray-500">
                    Seuil critique
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-500">
                    Actions recommandées
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-6 text-sm text-gray-900">Nombre d&apos;abonnés</td>
                  <td className="px-6 py-6 text-center text-sm font-medium text-gray-900">&lt; 50 / mois</td>
                  <td className="px-6 py-6 text-sm text-gray-700">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Mentionner @Urtam Formation dans chaque post du compte personnel de Stéphane Michel</li>
                      <li>Commenter les publications des DRH et responsables formation depuis le compte Urtam</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-6 text-sm text-gray-900">Nombre de posts publiés</td>
                  <td className="px-6 py-6 text-center text-sm font-medium text-gray-900">&lt; 4 / mois</td>
                  <td className="px-6 py-6 text-sm text-gray-700">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Publier un retour client après chaque session de formation</li>
                      <li>Filmer 30s en fin de session pour créer un post vidéo</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-6 text-sm text-gray-900">Taux engagement (en %)</td>
                  <td className="px-6 py-6 text-center text-sm font-medium text-gray-900">&lt; 1.5%</td>
                  <td className="px-6 py-6 text-sm text-gray-700">
                    <ul className="list-disc list-inside space-y-2">
                      <li>Poser une question à la fin de chaque post</li>
                      <li>Répondre à chaque commentaire</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Insights */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Insights
          </h2>
          <div className="space-y-3">
            {data.insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <p className="text-sm text-gray-900 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-xs text-gray-400 text-center">© 2026 Urtam Formation</p>
      </footer>
    </div>
  );
}
