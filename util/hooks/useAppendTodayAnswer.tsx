import { useGuessesLocalstorage, useWinStateLocalstorage } from "@/app/store";
import axios from "axios";
import moment from "moment-timezone";
import useGetPlayTime from "./useGetPlaytime";

/** 오늘의 정답을 guesses localstorge에 추가하기 위한 커스텀 훅
 * 
 * appendTodayAnswer 함수 불러와서 사용하면 됨.
 */
export default function useAppendTodayAnswer(){

    const { winState, setWinState } = useWinStateLocalstorage();
    const { guesses, setGuessesState } = useGuessesLocalstorage();
    const getPlayTime =  useGetPlayTime();

    /** 오늘의 정답을 guesses localstorage에 추가하는 함수
     * 
     * 인자 : 변경할 정답 상태 / 오직 포기에서만 동작
     * */
    async function appendTodayAnswer(type :number){

        const userNowDate = new Date();
        const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
        const nowTime = (koreanNowDate.hours() * 60) + koreanNowDate.minutes();

        let selectTodayAnswer = await axios(`/api/word/answer`); 
        let todayWord :string = selectTodayAnswer.data.word;

        if(winState === -1 && guesses !== null){
            let temp = [...guesses];
            const tempTodayWord = {
                query : todayWord,
                similarity : 100,
                rank : 0,
                time : nowTime,
                index : guesses.length + 1,
            }
            temp.push(tempTodayWord);
            setGuessesState(temp);
            setWinState(type);
            // 문제의 코드
            getPlayTime(tempTodayWord, guesses, true);
        }
    }

    return appendTodayAnswer
}