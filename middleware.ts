import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = ['/', '/services', '/aide', '/contact'].includes(req.nextUrl.pathname);

    // Autoriser l'accès aux routes publiques et aux routes d'auth
    if (isPublicRoute || isAuthPage || isApiAuthRoute) {
      return NextResponse.next();
    }

    // Rediriger vers la connexion si pas connecté
    if (!token) {
      const callbackUrl = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(
        new URL(`/auth/connexion?callbackUrl=${callbackUrl}`, req.url)
      );
    }

    const { pathname } = req.nextUrl;
    const userRole = token.role as string;

    // Protection des routes par rôle
    const roleRoutes = {
      SUPER_ADMIN: ['/admin'],
      ADMIN: ['/admin'],
      MANAGER: ['/manager', '/admin'],
      AGENT: ['/agent'],
      USER: ['/citoyen']
    };

    // Vérifier si l'utilisateur a accès à cette route
    const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || [];
    const hasAccess = allowedRoutes.some(route => pathname.startsWith(route));

    if (!hasAccess) {
      // Rediriger vers le dashboard approprié selon le rôle
      const dashboardRoutes = {
        SUPER_ADMIN: '/admin/dashboard',
        ADMIN: '/admin/dashboard',
        MANAGER: '/manager/dashboard',
        AGENT: '/agent/dashboard',
        USER: '/citoyen/dashboard'
      };

      const redirectPath = dashboardRoutes[userRole as keyof typeof dashboardRoutes] || '/';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Autoriser l'accès aux routes publiques
        const publicRoutes = ['/', '/services', '/aide', '/contact'];
        const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
        const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');
        const isApiRoute = req.nextUrl.pathname.startsWith('/api');

        if (isPublicRoute || isAuthRoute || isApiRoute) {
          return true;
        }

        // Exiger une authentification pour toutes les autres routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};