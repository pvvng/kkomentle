import { useGuessesLocalstorage, usePlayTimeLocalstorage, useUserData, useWinStateLocalstorage } from "@/app/store";

/** userdata에 저장된 오늘의 정답에 관한 데이터를 업데이트하는 함수 */
export default function useUpdateLocalStorageByDBdata(){
    const { nowUserData } = useUserData();
    const { setGuessesState } = useGuessesLocalstorage();
    const { setWinState } = useWinStateLocalstorage();
    const { setPlayTimeState } = usePlayTimeLocalstorage();

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

    return updateLocalStorageByDBdata;
}
