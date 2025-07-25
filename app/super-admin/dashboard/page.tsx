"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { useAuth } from '@/hooks/use-auth';
import { 
  Building2, 
  Users, 
  FileText, 
  BarChart3,
  Activity,
  Globe,
  Shield,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function SuperAdminDashboard() {
  const { user, isLoading } = useAuth('SUPER_ADMIN');

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Mock data - À remplacer par de vraies données
  const metriquesGlobales = {
    totalOrganisations: 25,
    totalUtilisateurs: 15430,
    demandesTraitees: 45670,
    tempsReparteMoyen: 4.2,
    organisationsActives: 23,
    agentsConnectes: 156
  };

  const organisationsOverview = [
    {
      nom: 'Mairie de Libreville',
      type: 'MAIRIE',
      utilisateurs: 3450,
      agents: 28,
      demandesEnCours: 145,
      satisfaction: 96,
      statut: 'ACTIVE'
    },
    {
      nom: 'DGDI',
      type: 'DIRECTION_GENERALE',
      utilisateurs: 8920,
      agents: 45,
      demandesEnCours: 234,
      satisfaction: 94,
      statut: 'ACTIVE'
    },
    {
      nom: 'Mairie de Port-Gentil',
      type: 'MAIRIE',
      utilisateurs: 1890,
      agents: 18,
      demandesEnCours: 67,
      satisfaction: 98,
      statut: 'ACTIVE'
    },
    {
      nom: 'CNSS',
      type: 'ORGANISME_SOCIAL',
      utilisateurs: 2340,
      agents: 22,
      demandesEnCours: 89,
      satisfaction: 92,
      statut: 'MAINTENANCE'
    },
    {
      nom: 'Ministère de l\'Intérieur',
      type: 'MINISTERE',
      utilisateurs: 4560,
      agents: 67,
      demandesEnCours: 198,
      satisfaction: 95,
      statut: 'ACTIVE'
    }
  ];

  const utilizationParService = [
    { service: 'Actes d\'état civil', demandes: 12450, pourcentage: 32 },
    { service: 'Documents d\'identité', demandes: 8930, pourcentage: 24 },
    { service: 'Services municipaux', demandes: 6780, pourcentage: 18 },
    { service: 'Services judiciaires', demandes: 4560, pourcentage: 12 },
    { service: 'Services sociaux', demandes: 3890, pourcentage: 10 },
    { service: 'Autres', demandes: 1560, pourcentage: 4 }
  ];

  const logsSysteme = [
    {
      timestamp: new Date('2024-01-15T09:30:00'),
      niveau: 'INFO',
      action: 'ORGANISATION_CREATED',
      details: 'Nouvelle organisation "Mairie d\'Owendo" créée',
      utilisateur: 'System'
    },
    {
      timestamp: new Date('2024-01-15T09:15:00'),
      niveau: 'WARNING',
      action: 'HIGH_LOAD',
      details: 'Charge élevée détectée sur DGDI (89% CPU)',
      utilisateur: 'System'
    },
    {
      timestamp: new Date('2024-01-15T08:45:00'),
      niveau: 'ERROR',
      action: 'SERVICE_DOWN',
      details: 'Service SMS temporairement indisponible',
      utilisateur: 'System'
    },
    {
      timestamp: new Date('2024-01-15T08:30:00'),
      niveau: 'INFO',
      action: 'BULK_UPDATE',
      details: 'Mise à jour des permissions agents (156 utilisateurs)',
      utilisateur: 'Jean-Baptiste NGUEMA'
    },
    {
      timestamp: new Date('2024-01-15T08:00:00'),
      niveau: 'INFO',
      action: 'BACKUP_COMPLETED',
      details: 'Sauvegarde automatique terminée avec succès',
      utilisateur: 'System'
    }
  ];

  const getOrganisationTypeBadge = (type: string) => {
    const typeMap = {
      'MAIRIE': { label: 'Mairie', color: 'bg-green-100 text-green-800' },
      'DIRECTION_GENERALE': { label: 'Direction', color: 'bg-blue-100 text-blue-800' },
      'MINISTERE': { label: 'Ministère', color: 'bg-purple-100 text-purple-800' },
      'ORGANISME_SOCIAL': { label: 'Organisme Social', color: 'bg-orange-100 text-orange-800' }
    };
    const config = typeMap[type as keyof typeof typeMap] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={`${config.color} text-xs`}>{config.label}</Badge>;
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'ACTIVE':
        return <Badge variant="outline" className="text-green-600 border-green-600">Actif</Badge>;
      case 'MAINTENANCE':
        return <Badge variant="secondary">Maintenance</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive">Inactif</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const getLogNiveauBadge = (niveau: string) => {
    switch (niveau) {
      case 'ERROR':
        return <Badge variant="destructive" className="text-xs">ERROR</Badge>;
      case 'WARNING':
        return <Badge variant="secondary" className="text-xs">WARN</Badge>;
      case 'INFO':
        return <Badge variant="outline" className="text-xs">INFO</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{niveau}</Badge>;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Administration Système</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de la plateforme Admin.ga
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Sécurité
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Configuration
            </Button>
          </div>
        </div>

        {/* Métriques Globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organisations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metriquesGlobales.totalOrganisations}</div>
              <p className="text-xs text-muted-foreground">
                {metriquesGlobales.organisationsActives} actives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metriquesGlobales.totalUtilisateurs.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {metriquesGlobales.agentsConnectes} agents connectés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metriquesGlobales.demandesTraitees.toLocaleString()}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>+15% ce mois</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metriquesGlobales.tempsReparteMoyen}j</div>
              <p className="text-xs text-muted-foreground">
                Traitement des demandes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibilité</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">99.8%</div>
              <p className="text-xs text-muted-foreground">
                Uptime système
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">96%</div>
              <p className="text-xs text-muted-foreground">
                Satisfaction globale
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Organisations Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vue d'ensemble des organisations</CardTitle>
                <CardDescription>
                  Performance et statut de toutes les organisations
                </CardDescription>
              </div>
              <Button variant="outline">
                <Building2 className="mr-2 h-4 w-4" />
                Gérer les organisations
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {organisationsOverview.map((org) => (
                <div key={org.nom} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{org.nom}</p>
                        {getOrganisationTypeBadge(org.type)}
                        {getStatutBadge(org.statut)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {org.utilisateurs.toLocaleString()} utilisateurs • {org.agents} agents
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-orange-600">{org.demandesEnCours}</div>
                      <div className="text-xs text-muted-foreground">En cours</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{org.satisfaction}%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Gérer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics et Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Utilisation par service */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisation par service</CardTitle>
              <CardDescription>
                Répartition des demandes par type de service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {utilizationParService.map((service) => (
                  <div key={service.service} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{service.service}</span>
                      <span className="text-muted-foreground">
                        {service.demandes.toLocaleString()} ({service.pourcentage}%)
                      </span>
                    </div>
                    <Progress value={service.pourcentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logs Système */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Logs système récents</CardTitle>
                  <CardDescription>
                    Dernières activités importantes
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Voir tous les logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logsSysteme.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      {getLogNiveauBadge(log.niveau)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{log.details}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <span>{log.timestamp.toLocaleString('fr-FR')}</span>
                        <span>•</span>
                        <span>{log.utilisateur}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides globales */}
        <Card>
          <CardHeader>
            <CardTitle>Actions système</CardTitle>
            <CardDescription>
              Outils d'administration globale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Utilisateurs</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Building2 className="h-5 w-5" />
                <span className="text-xs">Organisations</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Configuration</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Shield className="h-5 w-5" />
                <span className="text-xs">Sécurité</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Globe className="h-5 w-5" />
                <span className="text-xs">Monitoring</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}