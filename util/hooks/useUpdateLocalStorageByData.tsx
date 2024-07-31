import { useGuessesLocalstorage, usePlayTimeLocalstorage, useUserData, useWinStateLocalstorage } from "@/app/store";
import axios from "axios";

/** userdata에 저장된 오늘의 정답에 관한 데이터를 업데이트하는 함수 */
export default function useUpdateLocalStorageByDBdata(){
    const { nowUserData } = useUserData();
    const { guesses, setGuessesState } = useGuessesLocalstorage();
    const { winState, setWinState } = useWinStateLocalstorage();
    const { playtime, setPlayTimeState } = usePlayTimeLocalstorage();

    /** userdata에 오늘의 정답에 관한 데이터가 저장되어 있을 경우 
     * 
     * localstoreage를 해당 데이터로 업데이트 시켜버리는 함수
     */
    function updateLocalStorageByDBdata(){
        if (nowUserData !== undefined) {
            const todayGuesses = nowUserData.todayGuesses || [];
            if (todayGuesses.length > 0) {
                setGuessesState([...todayGuesses]);
            }
            if(nowUserData.isWin === 1){
                setWinState(1);
            }
            if(nowUserData.isWin === 0){
                setWinState(0);
            }
            if(nowUserData.todayPlayTime || 0 > 0){
                setPlayTimeState(nowUserData.todayPlayTime || 0);
            }
        }
    }

    /** localstorage에 오늘의 정답에 관한 데이터가 저장되어 있을 경우 
     * 
     * db userdata를 해당 데이터로 업데이트 시켜버리는 함수
     */
    function updateDBDataByLocalstoreage(){
        if(guesses !== null && winState !== null && playtime !== null){
            if(
                (
                    nowUserData?.isWin !== winState 
                    && 
                    nowUserData?.isWin === -1
                ) ||
                (
                    nowUserData?.todayGuesses?.length !== guesses?.length 
                    && nowUserData?.todayGuesses?.length === 0
                )||
                (
                    nowUserData?.todayPlayTime !== playtime 
                    && 
                    nowUserData?.todayPlayTime === -1
                )
            ){
                axios.post('/api/post/updateUserdata', {
                    winstate : winState,
                    gusses : [...guesses],
                    playtime : playtime
                }).catch(error => console.log(error));
            }
        }
    }

    return {
        updateLocalStorageByDBdata, 
        // updateDBDataByLocalstoreage
    };
}
