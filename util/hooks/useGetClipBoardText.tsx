import { useGuessesLocalstorage, usePlayTimeLocalstorage, useSettingState } from "@/app/store";
import { useEffect, useState } from "react";

/** 클립보드에 적힐 텍스트 뱉는 커스텀 훅
 * 
 * win text 정답을 맞혔을 때, 클립보드에 적힐 텍스트
 * lose text 포기했을 때, 클립보드에 적힐 텍스트
 * indexGuesses : 정답 단어의 인덱스 번호
 * hours : playtime의 시간
 * minutes : playtime의 분
 */
export default function useGetClipBoardText (index :number){
    // 정답을 몇번만에 맞췄는지 기록하는 상태    
    let [indexGuesses, setIndexGuesses] = useState(0);

    const { guesses } = useGuessesLocalstorage();
    const { setting } = useSettingState();
    const { playtime } = usePlayTimeLocalstorage();

    // 몫을 시간으로 사용
    const hours = Math.floor((playtime || 1) / 60); 
    // 나머지를 분으로 사용
    const minutes = (playtime || 1) % 60; 

    const SETTING_TEXT_TRY = setting.try ? `${indexGuesses}번 시도했어요.\n` : '';
    const SETTING_TEXT_TIME = setting.time ? `${hours}시간 ${minutes}분이 걸렸어요.\n` : '' ;

    function getSettingTextSim(index :number){
        // 정답을 바로 맞혀버리는 경우 index undefiend 에러가 발생한다.
        // 이를 방지하기 위해 index가 1(정답) 인데, 
        // guesses[1] === undefined인 경우 index를 0으로 설정
        if(index === 1 && guesses && guesses.length > 0 && guesses[index] === undefined){
            index = 0;
        }
        
        const SETTING_TEXT_SIM = 
        setting.sim ? 
        guesses && guesses.length > 0 ? 
        `추측한 단어 중에서 최고로 비슷한 단어는 ${
            guesses[index].query
        }, 유사도는 ${
            guesses[index].similarity 
        }에요.\n`
        : '추측한 단어가 없어요\n' 
        : '';

        return SETTING_TEXT_SIM;
    }

    const LOSE_SETTING_TEXT = SETTING_TEXT_TRY + SETTING_TEXT_TIME +  getSettingTextSim(0);
    const WIN_SETTING_TEXT = SETTING_TEXT_TRY + SETTING_TEXT_TIME +  getSettingTextSim(1);

    const WIN_TEXT = `${index}번째 꼬맨틀을 풀었습니다!.\n${WIN_SETTING_TEXT}\n꼬들꼬들`;
    const LOSE_TEXT = `${index}번째 꼬맨틀을 시도하지 않고 바로 포기했어요.\n${LOSE_SETTING_TEXT}\n꼬들꼬들`;

    useEffect(() => {
        guesses?.map(psg => {
            if(psg.rank === 0){
                // 정답 단어 몇번만에 맞췄는지 기재
                setIndexGuesses(psg.index || 0);
            }
        });
    },[guesses]);

    return { WIN_TEXT, LOSE_TEXT, indexGuesses, hours, minutes };
}