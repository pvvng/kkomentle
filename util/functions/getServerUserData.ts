import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

interface UserDataType  {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function getServerUserData(){
    // 로그인 테스트
    let session = await getServerSession(authOptions);
    const userdata = session?.user;
    delete userdata?.image;
  
    return userdata;
    
  }