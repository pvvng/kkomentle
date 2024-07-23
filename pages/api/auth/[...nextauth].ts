import NextAuth from 'next-auth';
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    })
    // ...add more providers here
  ],
  pages : {
    signIn: "/auth/sign-in",
  },
  secret : process.env.SOCIAL_LOGIN_SECRET,
};
export default NextAuth(authOptions);