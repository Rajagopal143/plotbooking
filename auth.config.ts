import axios from 'axios';
import { NextAuthConfig   } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            'http://localhost:5000/api/auth/org/login',
            credentials
          );
          const user = res.data;

          if (user) {
            return user;
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response.data.message || 'Login failed');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.accesstoken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.token = token.accesstoken;
      return session;
    }
  },
  pages: {
    signIn: '/signIn' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
