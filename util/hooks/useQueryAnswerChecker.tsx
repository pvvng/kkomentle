import { useRef, useState } from 'react';
import axios from 'axios';
import rankSimilarity, { SimilarityType } from '@/util/functions/rankSimilarity';
import moment from 'moment';

interface UseInputContainerProps {
    initialResult?: SimilarityType | null; // 초기 결과 설정 (선택적)
}

/** 
 * 사용자가 입력한 input value와 정답과의 유사도와 유사도 순위를 출력하는 커스텀 훅 
 * result(state) = 사용자 입력한 value의 값, 유사도, (유사도 순위)
 * */
export default function useQueryAnswerChecker({ initialResult = null }: UseInputContainerProps){

    const formatteTodaydDate = moment().format('YYYY-MM-DD');

    const inputRef = useRef<HTMLInputElement>(null);
    // 결과 상태 설정
    const [result, setResult] = useState<SimilarityType | null>(initialResult);

    const handleClick = async () => {

        if (inputRef.current !== null) {
            const inputValue = inputRef.current.value;
            if(inputValue.trim() === ''){
                alert('문자를 입력해야 해요.');
            }else{
                try {
                    // 결과를 찾았는지 여부 확인을 위한 변수
                    let found = false; 
    
                    // rankSimilarityArr 배열을 순회하며 조건을 검사하고 처리
                    for (const rs of await rankSimilarity()) {
                        if (inputValue === rs.query) {
                            setResult(rs); // 결과 설정
                            found = true;
                            break; // 반복 중단
                        }
                    }
    
                    if (!found) {
                        let res = await axios.get(`/api/get/checkAnswer?answer=${inputValue}&date=${formatteTodaydDate}`);
                        setResult(res.data); // 결과 설정
                    }
    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }finally{
                    // 위 과정이 완료되면 input에 포커싱 되게
                    inputRef.current.focus();
                }
            }
            inputRef.current.value = ''; // 입력 값 초기화
        }
    };

    return { inputRef, result, handleClick };
};

