"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { useAuth } from '@/hooks/use-auth';
import { 
  Users, 
  Building2, 
  FileText, 
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Settings,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Mock data - À remplacer par de vraies données
  const stats = {
    totalUsers: 1250,
    activeRequests: 45,
    completedToday: 23,
    pendingReview: 12,
    organizationName: user?.organization?.name || 'Administration'
  };

  const demandesParJour = [
    { jour: 'Lun', demandes: 45, traitees: 38 },
    { jour: 'Mar', demandes: 52, traitees: 49 },
    { jour: 'Mer', demandes: 48, traitees: 44 },
    { jour: 'Jeu', demandes: 61, traitees: 58 },
    { jour: 'Ven', demandes: 55, traitees: 52 },
    { jour: 'Sam', demandes: 23, traitees: 20 },
    { jour: 'Dim', demandes: 18, traitees: 15 }
  ];

  const agentsPerformance = [
    {
      nom: 'Paul OBIANG',
      service: 'État Civil',
      enCours: 8,
      completees: 142,
      satisfaction: 98,
      charge: 'normale'
    },
    {
      nom: 'Marie NZENGUE',
      service: 'Urbanisme',
      enCours: 12,
      completees: 128,
      satisfaction: 96,
      charge: 'élevée'
    },
    {
      nom: 'Pierre MBOUMBA',
      service: 'Social',
      enCours: 6,
      completees: 89,
      satisfaction: 94,
      charge: 'faible'
    },
    {
      nom: 'Sylvie BOUKOUMOU',
      service: 'État Civil',
      enCours: 9,
      completees: 156,
      satisfaction: 99,
      charge: 'normale'
    }
  ];

  const servicesOfferts = [
    { nom: 'Acte de naissance', demandes: 145, delaiMoyen: 3, actif: true },
    { nom: 'Acte de mariage', demandes: 89, delaiMoyen: 5, actif: true },
    { nom: 'Certificat de résidence', demandes: 123, delaiMoyen: 2, actif: true },
    { nom: 'Permis de construire', demandes: 67, delaiMoyen: 15, actif: true },
    { nom: 'Autorisation de commerce', demandes: 34, delaiMoyen: 8, actif: false }
  ];

  const getChargeColor = (charge: string) => {
    switch (charge) {
      case 'élevée':
        return 'text-red-600';
      case 'normale':
        return 'text-green-600';
      case 'faible':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChargeBadge = (charge: string) => {
    switch (charge) {
      case 'élevée':
        return <Badge variant="destructive" className="text-xs">Élevée</Badge>;
      case 'normale':
        return <Badge variant="default" className="text-xs">Normale</Badge>;
      case 'faible':
        return <Badge variant="secondary" className="text-xs">Faible</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{charge}</Badge>;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord Administration</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de {stats.organizationName}
            </p>
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configuration
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>+12% depuis le mois dernier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes Actives</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activeRequests}</div>
              <p className="text-xs text-muted-foreground">
                En cours de traitement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complétées Aujourd'hui</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>+18% par rapport à hier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente de Validation</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pendingReview}</div>
              <p className="text-xs text-muted-foreground">
                Nécessitent une attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activité de la semaine */}
          <Card>
            <CardHeader>
              <CardTitle>Activité de la semaine</CardTitle>
              <CardDescription>
                Demandes reçues vs traitées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {demandesParJour.map((jour) => (
                  <div key={jour.jour} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{jour.jour}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Reçues: {jour.demandes}</span>
                        <span>Traitées: {jour.traitees}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(jour.traitees / jour.demandes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {Math.round((jour.traitees / jour.demandes) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services populaires */}
          <Card>
            <CardHeader>
              <CardTitle>Services les plus demandés</CardTitle>
              <CardDescription>
                Ce mois-ci
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicesOfferts
                  .sort((a, b) => b.demandes - a.demandes)
                  .slice(0, 5)
                  .map((service, index) => (
                  <div key={service.nom} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.nom}</span>
                        <Badge variant={service.actif ? 'default' : 'secondary'}>
                          {service.actif ? 'Actif' : 'Suspendu'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{service.demandes} demandes</span>
                        <span>Délai moyen: {service.delaiMoyen} jours</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance des agents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Performance des agents</CardTitle>
                <CardDescription>
                  Vue d'ensemble de votre équipe
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <UserCheck className="mr-2 h-4 w-4" />
                Gérer l'équipe
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentsPerformance.map((agent) => (
                <div key={agent.nom} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {agent.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{agent.nom}</p>
                      <p className="text-sm text-muted-foreground">{agent.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-orange-600">{agent.enCours}</div>
                      <div className="text-muted-foreground">En cours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{agent.completees}</div>
                      <div className="text-muted-foreground">Complétées</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{agent.satisfaction}%</div>
                      <div className="text-muted-foreground">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      {getChargeBadge(agent.charge)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Dernières actions dans votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouvelle demande d'acte de naissance</p>
                    <p className="text-xs text-muted-foreground">Par Jean DUPONT • Il y a 5 min</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Agent Paul OBIANG s'est connecté</p>
                    <p className="text-xs text-muted-foreground">Service État Civil • Il y a 15 min</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Document validé et prêt</p>
                    <p className="text-xs text-muted-foreground">Casier judiciaire #GA-2024-002 • Il y a 1h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Demande nécessite une attention</p>
                    <p className="text-xs text-muted-foreground">Permis de construire #GA-2024-045 • Il y a 2h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau citoyen inscrit</p>
                    <p className="text-xs text-muted-foreground">Marie OKOUYI • Il y a 3h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration des Services</CardTitle>
              <CardDescription>
                Gérer les services offerts par votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {servicesOfferts.map((service) => (
                  <div key={service.nom} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{service.nom}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.demandes} demandes • {service.delaiMoyen} jours
                      </p>
                    </div>
                    <Badge variant={service.actif ? 'default' : 'secondary'}>
                      {service.actif ? 'Actif' : 'Suspendu'}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configurer les services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}