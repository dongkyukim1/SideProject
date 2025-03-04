import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

interface Token extends JWT {
  accessToken?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: account.access_token,
              id_token: account.id_token,
              provider: account.provider,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            token.accessToken = data.token;
          }
        } catch (error) {
          console.error('백엔드 인증 오류:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = (token as Token).accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 