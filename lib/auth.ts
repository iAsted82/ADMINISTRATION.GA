import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import type { User, UserRole } from '@prisma/client';

export function getAuthOptions(): NextAuthOptions {
  return {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            organization: true,
            profile: true
          }
        });

        if (!user || !user.isActive) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        });

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organizationId: user.organizationId,
          organization: user.organization,
          isVerified: user.isVerified,
          profile: user.profile
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.organization = user.organization;
        token.isVerified = user.isVerified;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.organizationId = token.organizationId as string;
        session.user.organization = token.organization as any;
        session.user.isVerified = token.isVerified as boolean;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/connexion',
    signUp: '/auth/inscription',
    error: '/auth/erreur',
  },
  events: {
    async signIn({ user, account, profile }) {
      // Log successful login
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGIN',
          details: {
            provider: account?.provider,
            userAgent: 'web' // You can get this from request headers
          }
        }
      });
    },
    async signOut({ token }) {
      // Log logout
      if (token?.sub) {
        await prisma.auditLog.create({
          data: {
            userId: token.sub,
            action: 'LOGOUT'
          }
        });
      }
    }
  }
  };
}