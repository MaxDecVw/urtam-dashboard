'use client';

import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import CountUp from '@/components/CountUp';
import dashboardData from '@/lib/data/dashboard-data.json';

export default function HomePage() {
  const data = dashboardData;
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
      link.download = 'dashboard-objectifs-2026.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erreur capture:', err);
    } finally {
      setCapturing(false);
    }
  }, []);

  const chartDataFollowers = data.suiviMensuel.mois.map((mois, index) => ({
    mois,
    abonnes: data.suiviMensuel.abonnes[index]
  }));

  const chartDataActivity = data.suiviMensuel.mois.map((mois, index) => ({
    mois,
    posts: data.suiviMensuel.posts[index],
  }));

  return (
    <div ref={dashboardRef} className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-urtam" style={{ color: '#032b77' }}>
            Tableau de bord <span className="font-light text-gray-300 mx-1">|</span> Urtam Formation
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
            className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-urtam text-urtam transition-colors"
            style={{ borderColor: '#032b77', color: '#032b77' }}
          >
            Objectifs 2026
          </Link>
          <Link
            href="/resultats"
            className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
          >
            Projections 2026
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* Situation actuelle */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Situation actuelle
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Abonnés LinkedIn Urtam</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.urtam.linkedinFollowers} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Abonnés LinkedIn Stéphane Michel</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}><CountUp end={data.stephaneMichel.linkedinFollowers} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Dernier post Stéphane Michel</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}>1 an</p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Témoignages clients</p>
              <p className="text-3xl font-semibold mt-2 text-urtam" style={{ color: '#032b77' }}>2</p>
            </div>
          </div>
        </section>

        {/* KPIs à suivre */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            KPIs à suivre
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    KPI
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    Valeur actuelle
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    Objectif 6 mois
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Abonnés LinkedIn Urtam</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.urtam.linkedinFollowers}</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.objectifs.followersM6}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Posts publiés / mois</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.urtam.linkedinPosts}</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.objectifs.postsParMois}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Taux d&apos;engagement</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.urtam.engagementRate}%</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.objectifs.engagementCible}%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Demandes mentionnant Urtam</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>0%</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold text-urtam" style={{ color: '#032b77' }}>{data.objectifs.contactsUrtam}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Suivi mensuel */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Suivi mensuel
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
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Graphique posts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-base font-medium text-gray-900 mb-6">
                Posts publiés par mois
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartDataActivity} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
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
                    label={{ value: 'Nombre de posts', angle: -90, position: 'outside', dx: -25, style: { fontSize: 12, fill: '#9CA3AF', textAnchor: 'middle' } }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 13 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#032b77"
                    strokeWidth={2.5}
                    dot={{ fill: '#032b77', r: 4, strokeWidth: 0 }}
                    connectNulls={false}
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
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-900 leading-relaxed">
                La communication repose exclusivement sur Stéphane Michel, ce qui limite l&apos;identification d&apos;Urtam comme une marque autonome.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-sm text-gray-900 leading-relaxed">
                L&apos;audience existante sur la page LinkedIn de Stéphane Michel constitue un levier immédiat pour la notoriété d&apos;Urtam.
              </p>
            </div>
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
