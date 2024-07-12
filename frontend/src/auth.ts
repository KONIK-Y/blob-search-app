import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { HOST_URI } from './config/env';

export const authConfig = {
  secret: process.env.SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const unprotectedPaths = ['/login'];

      const isProtected = !unprotectedPaths.some((path) => nextUrl.pathname.startsWith(path));

      if (isProtected && !isLoggedIn) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn(params) {
      const { user } = params;
      if (user.image === null) {
        user.image = '/assets/userassets/default-icon.png';
      }
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      token.accessToken;
      return {
        ...session,
        user: {
          name: session.user.name,
          image: session.user.image,
          department: token.department,
          uuid: token.uuid,
        },
      };
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'microsoft-entra-id') {
        const headers = { Authorization: `Bearer ${account.access_token}` };
        const res = await fetch('https://graph.microsoft.com/v1.0/me?$select=department', { headers });
        const data = await res.json();
        token.department = data.department;
      }

      token.user = user;
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
  },
  providers: [
    MicrosoftEntraID({
      // Doc: https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/microsoft-entra-id.ts
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        params: {
          redirect_uri: `${HOST_URI}/api/auth/callback/microsoft-entra-id`,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid profile email User.Read',
        },
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
});
