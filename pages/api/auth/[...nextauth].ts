import NextAuth from 'next-auth';
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/kakao`
        }
      }
    })
    // ...add more providers here
  ],
  pages : {
    signIn: "/auth/sign-in",
  },
  secret : process.env.SOCIAL_LOGIN_SECRET,
  callbacks: {
    async redirect({ url, baseUrl } : { url :string, baseUrl:string}) {
      // 외부 URL 리디렉션을 허용하지 않으려면 이 콜백을 사용자 정의합니다.
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
};
export default NextAuth(authOptions);