'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from '@/components/CountUp';
import ShareMenu from '@/components/ShareMenu';

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
  const dashboardRef = useRef<HTMLDivElement>(null);

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
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 mx-auto" style={{ borderTopColor: '#032b77' }}></div>
          <p className="mt-4 text-sm text-gray-500">Chargement des données...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-semibold tracking-tight" style={{ color: '#032b77' }}>
            Tableau de bord <span className="font-light text-gray-300 mx-1">|</span> Urtam Formation
          </h1>
          <ShareMenu targetRef={dashboardRef} filePrefix="urtam-objectifs" pageTitle="Tableau de bord - Objectifs 2026" />
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-medium border-2 transition-colors"
            style={{ borderColor: '#032b77', color: '#032b77', backgroundColor: 'transparent' }}
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
              <p className="text-3xl font-semibold mt-2" style={{ color: '#032b77' }}><CountUp end={data.urtam.linkedinFollowers} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Abonnés LinkedIn Stéphane Michel</p>
              <p className="text-3xl font-semibold mt-2" style={{ color: '#032b77' }}><CountUp end={data.stephaneMichel.linkedinFollowers} /></p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Dernier post Stéphane Michel</p>
              <p className="text-3xl font-semibold mt-2" style={{ color: '#032b77' }}>1 an</p>
            </div>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <p className="text-xs text-gray-900 font-medium leading-tight">Témoignages clients</p>
              <p className="text-3xl font-semibold mt-2" style={{ color: '#032b77' }}>2</p>
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
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.urtam.linkedinFollowers}</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.objectifs.followersM6}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Posts publiés / mois</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.urtam.linkedinPosts}</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.objectifs.postsParMois}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Taux d&apos;engagement</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.urtam.engagementRate}%</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.objectifs.engagementCible}%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Demandes mentionnant Urtam</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>0%</td>
                  <td className="px-6 py-4 text-center text-lg font-semibold" style={{ color: '#032b77' }}>{data.objectifs.contactsUrtam}%</td>
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

          {/* Tableau récapitulatif */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Métrique
                  </th>
                  {data.suiviMensuel.mois.map((mois, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-center text-sm font-semibold text-gray-500"
                    >
                      {mois}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Nombre d&apos;abonnés</td>
                  {data.suiviMensuel.abonnes.map((val, index) => (
                    <td key={index} className={`px-6 py-4 text-center text-sm ${val !== null ? 'text-gray-900' : 'text-gray-300'}`}>
                      {val !== null ? val : '—'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Nombre de posts publiés</td>
                  {data.suiviMensuel.posts.map((val, index) => (
                    <td key={index} className={`px-6 py-4 text-center text-sm ${val !== null ? 'text-gray-900' : 'text-gray-300'}`}>
                      {val !== null ? val : '—'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Taux engagement (en %)</td>
                  {data.suiviMensuel.engagement.map((val, index) => (
                    <td key={index} className={`px-6 py-4 text-center text-sm ${val !== null ? 'text-gray-900' : 'text-gray-300'}`}>
                      {val !== null ? `${val}%` : '—'}
                    </td>
                  ))}
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
