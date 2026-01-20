'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Share2, Users, Star, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Réseaux Sociaux', href: '/reseaux-sociaux', icon: Share2 },
  { name: 'Concurrence', href: '/concurrence', icon: Users },
  { name: 'Réputation', href: '/reputation', icon: Star },
  { name: 'Web Vitals', href: '/web-vitals', icon: Gauge },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold text-primary">
            URTAM
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors',
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'h-6 w-6 shrink-0',
                            isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* Footer */}
            <li className="mt-auto">
              <div className="text-xs text-gray-500 py-3 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">URTAM Formation</p>
                <p>Dashboard Analytique</p>
                <p className="mt-2">Dernière mise à jour :</p>
                <p className="font-medium text-gray-700">18 déc. 2024</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
