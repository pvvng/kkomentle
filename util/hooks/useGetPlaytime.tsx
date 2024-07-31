import { usePlayTimeLocalstorage, useUserData } from "@/app/store";
import moment from "moment-timezone";
import { JsonSimilarityType } from "./useHandleLocalstorage";
import axios from "axios";
import { UserDataType } from "../functions/getServerUserData";
import handleMultipleConditions from "../functions/handleMultipleConditionsBadge";

/** 정답을 맞히거나 포기했을때 playtime을 계산하는 함수를 뱉는 커스텀 훅 */
export default function useGetPlayTime(){
    const { setPlayTimeState } = usePlayTimeLocalstorage();
    const { nowUserData } = useUserData();

    // 사용자 디바이스의 시간을 한국시로 포맷하기
    // 현재 시간 암호화
    const userNowDate = new Date();
    const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");

    /** 정답을 맞췄을 때 / 포기했을 때의 playtime을 얻는 함수 */
    async function getPlayTime(
        /** 새롭게 등록되는 추측 단어 객체 */
        guessedWord :JsonSimilarityType, 
        /** 기존 localhost에 등록된 추측 단어 객체 어레이 */
        guesses :JsonSimilarityType[] | null,
    ){
        let endTime = guessedWord.time || 0;

        // 만약 guesses의 length 가 0일 경우에는 starttime이 undfiend가 되어 0이 될것이다.
        // 이를 방지하기 위해 startTime이 undefiend 일 경우 endtime과 동일하게 만들어버린다.
        let startTime = guesses?.filter(item => item.index === 1)[0]?.time || endTime;

        let playtime = endTime - startTime;

        // playtime store에 playtime 계산한 업데이트
        setPlayTimeState(playtime);

        let guessesLength = guesses?.length || 0;
        let formattedDate = koreanNowDate.format('YYYY-MM-DD');

        if(guessedWord !== undefined && guessesLength >= 0){
            const putter = {
                guessedWord : guessedWord.query,
                date : formattedDate,
                playtime : playtime,
                try : guessesLength + 1,
                isLogin : 
                nowUserData === undefined ? undefined : nowUserData.email
            }
            // db에 클리어 정보 업데이트
            let postPlayTime = await axios.post('/api/post/tryCount', putter);
            // playtime이 10분 이하일 경우 악동 꼬들꼬들 뱃지 획득
            if(playtime <= 10){
                await handleMultipleConditions(nowUserData, 3);
            }
        }  
    }

    return getPlayTime;
}