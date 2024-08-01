import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { connectDB } from "../database";
import { ObjectId } from "mongodb";
import moment from "moment-timezone";
import { JsonSimilarityType } from "../hooks/useHandleLocalstorage";

export interface UserDataType {
  _id?: ObjectId;
  name: string;
  email: string;
  image ?: string;
  badge ?: boolean[],
  topTime?: number;
  topIndex?: number;
  today?: string;
  isWin?: number;
  todayTry?: number;
  todayPlayTime?: number;
  todayGuesses ?: JsonSimilarityType[];
}

export async function getServerUserData(): Promise<UserDataType | undefined> {
  // 오늘의 날짜 포맷
  const userNowDate = new Date();
  const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
  const formattedTodayDate = koreanNowDate.format('YYYY-MM-DD');

  // 로그인 정보 불러오기
  let session = await getServerSession(authOptions);

  // 로그인하지 않은 상태면 undefined 반환
  if (!session) {
    return undefined;
  }

  // 불러온 session 값에서 image key 삭제
  const tempUserdata = { ...session.user };
  delete tempUserdata.image;

  // 이메일과 이름이 유효한지 확인
  if (!tempUserdata.email) {
    throw new Error("User email is missing");
  }

  if (!tempUserdata.name) {
    tempUserdata.name = "Unknown";
  }

  // 필요한 필드만 남기기
  const userdata: UserDataType = {
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
      const newUser: UserDataType = {
        _id: new ObjectId(),
        ...userdata,
        image : '꼬들꼬들',
        badge : [true, false, false, false, false],
        topTime: -1,
        topIndex: -1,
        today: formattedTodayDate,
        isWin: -1,
        todayTry: -1,
        todayPlayTime : 0,
        todayGuesses : [],
      };
      await db.collection('userdata').insertOne(newUser);
      console.log('회원가입 성공!');
      alert('꼬들꼬들 뱃지를 획득했어요!');
      return newUser;
    } catch (error) {
      // 에러처리
      console.log('회원가입 중 에러가 발생했습니다 : ', error);
      return undefined;
    }
  } else {
    // 오늘 날짜가 다르면 업데이트
    if (resultGetUserData.today !== formattedTodayDate) {
      try {
        await db.collection('userdata').updateOne(
          { email: userdata.email },
          {
            $set: {
              today: formattedTodayDate,
              isWin: -1,
              todayTry: -1,
              todayPlayTime: 0,
              todayGuesses : [],
            }
          }
        );
        console.log('사용자 정보 업데이트 완료');
        
        // 업데이트된 사용자 데이터 반환
        const updatedUserData = await db.collection('userdata').findOne({ email: userdata.email });
        
        if (updatedUserData) {
          return {
            _id: updatedUserData._id,
            name: updatedUserData.name ?? "Unknown",
            email: updatedUserData.email,
            image: updatedUserData.image,
            badge: updatedUserData.badge,
            topTime: updatedUserData.topTime,
            topIndex: updatedUserData.topIndex,
            today: updatedUserData.today,
            isWin: updatedUserData.isWin,
            todayTry: updatedUserData.todayTry,
            todayPlayTime : updatedUserData.todayPlayTime,
            todayGuesses : updatedUserData.todayGuesses,
          };
        }
      } catch (error) {
        // 에러처리
        console.log('사용자 데이터 업데이트 중 에러가 발생했습니다 : ', error);
        return undefined;
      }
    } else {
      return {
        _id: resultGetUserData._id,
        name: resultGetUserData.name ?? "Unknown",
        email: resultGetUserData.email,
        image : resultGetUserData.image,
        badge : resultGetUserData.badge,
        topTime: resultGetUserData.topTime,
        topIndex: resultGetUserData.topIndex,
        today: resultGetUserData.today,
        isWin: resultGetUserData.isWin,
        todayTry: resultGetUserData.todayTry,
        todayPlayTime : resultGetUserData.todayPlayTime,
        todayGuesses : resultGetUserData.todayGuesses,
      };
    }
  }
}
