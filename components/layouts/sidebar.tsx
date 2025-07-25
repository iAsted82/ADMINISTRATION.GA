"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  FileText,
  Calendar,
  Users,
  Settings,
  BarChart3,
  Building2,
  Shield,
  UserCog,
  ClipboardList,
  Clock,
  CheckCircle
} from 'lucide-react';

const navigation = {
  USER: [
    { name: 'Tableau de bord', href: '/citoyen/dashboard', icon: Home },
    { name: 'Mes demandes', href: '/citoyen/demandes', icon: FileText },
    { name: 'Mes rendez-vous', href: '/citoyen/rendez-vous', icon: Calendar },
    { name: 'Mon profil', href: '/citoyen/profil', icon: Users },
  ],
  AGENT: [
    { name: 'Tableau de bord', href: '/agent/dashboard', icon: Home },
    { name: 'File d\'attente', href: '/agent/demandes', icon: ClipboardList },
    { name: 'Mes rendez-vous', href: '/agent/rendez-vous', icon: Calendar },
    { name: 'Traitées', href: '/agent/traitees', icon: CheckCircle },
  ],
  MANAGER: [
    { name: 'Tableau de bord', href: '/manager/dashboard', icon: Home },
    { name: 'Équipe', href: '/manager/equipe', icon: Users },
    { name: 'Demandes', href: '/manager/demandes', icon: FileText },
    { name: 'Planning', href: '/manager/planning', icon: Calendar },
    { name: 'Statistiques', href: '/manager/statistiques', icon: BarChart3 },
  ],
  ADMIN: [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: Home },
    { name: 'Organisation', href: '/admin/organisation', icon: Building2 },
    { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: UserCog },
    { name: 'Demandes', href: '/admin/demandes', icon: FileText },
    { name: 'Services', href: '/admin/services', icon: Settings },
    { name: 'Rapports', href: '/admin/rapports', icon: BarChart3 },
  ],
  SUPER_ADMIN: [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: Home },
    { name: 'Super Admin', href: '/super-admin/dashboard', icon: Shield },
    { name: 'Administrations', href: '/admin/administrations', icon: Building2 },
    { name: 'Utilisateurs', href: '/admin/utilisateurs', icon: UserCog },
    { name: 'Système', href: '/admin/systeme', icon: Shield },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Configuration', href: '/admin/configuration', icon: Settings },
  ],
};

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const userNavigation = navigation[session.user.role] || navigation.USER;

  return (
    <div className="hidden border-r bg-card md:block w-64">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold">
            {session.user.role === 'SUPER_ADMIN' && 'Administration Système'}
            {session.user.role === 'ADMIN' && 'Administration'}
            {session.user.role === 'MANAGER' && 'Gestion'}
            {session.user.role === 'AGENT' && 'Guichet'}
            {session.user.role === 'USER' && 'Espace Citoyen'}
          </h2>
          {session.user.organization && (
            <p className="text-sm text-muted-foreground mt-1">
              {session.user.organization.name}
            </p>
          )}
        </div>
        
        <Separator />

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {userNavigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-secondary'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/aide">
              <Shield className="mr-2 h-4 w-4" />
              Aide & Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}