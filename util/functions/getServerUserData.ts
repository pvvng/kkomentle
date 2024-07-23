import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { connectDB } from "../database";
import { ObjectId } from "mongodb";

export interface UserDataType {
  name: string | null | undefined;
  email: string | null | undefined;
}

export async function getServerUserData(){
  // 로그인 정보 불러오기
  let session = await getServerSession(authOptions);
  
  // 로그인하지 않은 상태면 undefined 반환
  if (!session) {
    return undefined;
  }

  // 불러온 session 값에서 image key 삭제
  const tempUserdata = { ...session.user };
  delete tempUserdata.image;

  // 필요한 필드만 남기기
  const userdata = {
    name: tempUserdata.name,
    email: tempUserdata.email,
  };

  // db에서 session의 email과 같은 user가 존재하는지 불러오기
  const db = (await connectDB).db('kkomentle');
  const resultGetUserData = await db.collection('userdata')
    .findOne({ email: userdata.email });

  // 만약 db에 존재하지 않는 유저라면 db에 추가하기
  if (!resultGetUserData) {
    try {
      const resultPostUserData = await db.collection('userdata')
        .insertOne({
          _id: new ObjectId(),
          ...userdata,
          topTime: 0,
          topIndex: 0,
        });
      console.log('회원가입 성공!');
      return userdata;
    } catch (error) {
      // 에러처리
      console.log('회원가입 중 에러가 발생했습니다 : ', error);
      return undefined;
    }
  }

  return userdata;
}
