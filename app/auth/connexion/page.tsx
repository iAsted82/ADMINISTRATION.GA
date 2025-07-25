"use client";

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Flag, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { DEMO_ACCOUNTS } from '@/lib/constants';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginWithDemoAccount = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setIsLoading(true);
    setError('');
    
    // Fill form fields
    setValue('email', account.email);
    setValue('password', account.password);

    const toastId = toast.loading(`Connexion avec ${account.firstName} ${account.lastName}...`);

    try {
      const result = await signIn('credentials', {
        email: account.email,
        password: account.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Erreur de connexion', { id: toastId });
        setError('Erreur de connexion');
        return;
      }

      toast.success(`Connecté en tant que ${account.firstName} ${account.lastName}`, { id: toastId });

      // Get the session to determine redirect based on role
      const session = await getSession();
      if (session?.user) {
        switch (session.user.role) {
          case 'SUPER_ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'MANAGER':
            router.push('/manager/dashboard');
            break;
          case 'AGENT':
            router.push('/agent/dashboard');
            break;
          default:
            router.push('/citoyen/dashboard');
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue', { id: toastId });
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError('');

    const toastId = toast.loading('Connexion en cours...');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Email ou mot de passe incorrect', { id: toastId });
        setError('Email ou mot de passe incorrect');
        return;
      }

      toast.success('Connexion réussie !', { id: toastId });

      // Get the session to determine redirect based on role
      const session = await getSession();
      if (session?.user) {
        switch (session.user.role) {
          case 'SUPER_ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'MANAGER':
            router.push('/manager/dashboard');
            break;
          case 'AGENT':
            router.push('/agent/dashboard');
            break;
          default:
            router.push('/citoyen/dashboard');
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.', { id: toastId });
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 gabon-gradient rounded-full flex items-center justify-center">
              <Flag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl gabon-text-gradient">Admin.ga</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Connexion</h1>
          <p className="text-muted-foreground">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Se connecter</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    {...register('password')}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Pas encore de compte ?
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/auth/inscription">
                  Créer un compte citoyen
                </Link>
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/auth/mot-de-passe-oublie"
                className="text-sm text-primary hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="mt-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Accès Rapide - Comptes de Démonstration</span>
            </CardTitle>
            <CardDescription>
              Connectez-vous directement avec un compte de test en un clic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_ACCOUNTS.map((account) => (
              <div key={account.email} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                    account.role === 'SUPER_ADMIN' ? 'bg-red-500' :
                    account.role === 'ADMIN' ? 'bg-orange-500' :
                    account.role === 'MANAGER' ? 'bg-yellow-500' :
                    account.role === 'AGENT' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`}>
                    {account.firstName.charAt(0)}{account.lastName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {account.firstName} {account.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {account.role === 'SUPER_ADMIN' && 'Super Administrateur'}
                      {account.role === 'ADMIN' && 'Administrateur'}
                      {account.role === 'MANAGER' && 'Responsable'}
                      {account.role === 'AGENT' && 'Agent'}
                      {account.role === 'USER' && 'Citoyen'}
                      {account.organization && ` • ${account.organization}`}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => loginWithDemoAccount(account)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                💡 <strong>Astuce:</strong> Ces comptes sont pré-configurés pour tester toutes les fonctionnalités de la plateforme selon votre rôle.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}