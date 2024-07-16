import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import rankSimilarity, { SimilarityType } from '@/util/functions/rankSimilarity';

interface UseInputContainerProps {
    initialResult?: SimilarityType | null; // 초기 결과 설정 (선택적)
}

/** 
 * 사용자가 입력한 input value와 정답과의 유사도와 유사도 순위를 출력하는 커스텀 훅 
 * result(state) = 사용자 입력한 value의 값, 유사도, (유사도 순위)
 * */
export default function useQueryAnswerChecker({ initialResult = null }: UseInputContainerProps){

    const inputRef = useRef<HTMLInputElement>(null);
    // 결과 상태 설정
    const [result, setResult] = useState<SimilarityType | null>(initialResult);
    // 정답 상태
    const [winState, setWinState] = useState(-1);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // 기본 동작 방지

        if (inputRef.current !== null) {
            const inputValue = inputRef.current.value;
            if(inputValue.trim() === ''){
                alert('문자를 입력해야 해요.');
            }else{
                try {
                    // 결과를 찾았는지 여부 확인을 위한 변수
                    let found = false; 
    
                    // rankSimilarityArr 배열을 순회하며 조건을 검사하고 처리
                    for (const rs of rankSimilarity()) {
                        if (inputValue === rs.query) {
                            setResult(rs); // 결과 설정
                            found = true;
                            break; // 반복 중단
                        }
                    }
    
                    if (!found) {
                        let res = await axios.get(`/api/get/checkAnswer?answer=${inputValue}`);
                        setResult(res.data); // 결과 설정
                    }
    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            inputRef.current.value = ''; // 입력 값 초기화
        }
    };
    
    // 새로고침 혹은 리렌더링 시 localstorage에서 winState (정답 상태) 가져오기
    useEffect(() => {
        let storedWinState = localStorage.getItem('winState');
        if(storedWinState !== null){
            setWinState(parseInt(storedWinState));
        }
    },[]);

    // localstorage에서 가져오는 정답상태는 새로 고침 이전에는 즉각적인 반영이 어렵기 때문에
    // winState 상태를 통해서 현재 사용자가 입력한 값이 정답이면 즉각적으로 웹에 반영하기
    useEffect(() => {
        const similarity = result?.similarity;
        const rank = result?.rank;

        if(similarity !== undefined && rank !== undefined){
            if(Math.floor(similarity) >= 1 && rank === 0){
                setWinState(1);
            }
        }
    },[result])

    return { inputRef, result, handleClick, winState };
};

