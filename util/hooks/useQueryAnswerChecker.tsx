import { useRef, useState } from 'react';
import axios from 'axios';
import rankSimilarity, { SimilarityType } from '@/util/functions/rankSimilarity';
import isValidKoreanCombination from '../functions/isValidKoreanCombination';
import { useQuery } from '@tanstack/react-query';
import moment from "moment-timezone";

interface UseInputContainerProps {
    initialResult?: SimilarityType | null; // 초기 결과 설정 (선택적)
}

/** 
 * 사용자가 입력한 input value와 정답과의 유사도와 유사도 순위를 출력하는 커스텀 훅 
 * result(state) = 사용자 입력한 value의 값, 유사도, (유사도 순위)
 * */
export default function useQueryAnswerChecker({ initialResult = null }: UseInputContainerProps){

    // 디바이스 시간을 한국시로 포맷
    const userNowDate = new Date();
    const koreanNowDate = moment(userNowDate).tz("Asia/Seoul");
    const formattedTodayDate = koreanNowDate.format('YYYY-MM-DD');

    const inputRef = useRef<HTMLInputElement>(null);
    // 결과 상태 설정
    const [result, setResult] = useState<SimilarityType | null>(initialResult);

    // react-query를 이용해서 db에 있는 rankSimilarity 데이터를 불러오고 이를 캐싱함
    // 이를 통해 매번 input 값을 입력할 때마다 새롭게 rankSimilarity 데이터를 불러오는 것을 해소함
    // 결과적으로 db 비용 절약 및 속도 개선에 이점을 얻을 수 있음
    const { data :rankSimilarityArr, isLoading, isError } = useQuery<SimilarityType[], Error>({
        queryKey : ['rankSimilarity'],
        queryFn : rankSimilarity,
        gcTime : 1000 * 60 * 60 * 24, // 1일
        staleTime : 1000 * 60 * 60, // 1시간
    })

    const handleClick = async () => {

        if (inputRef.current !== null) {
            const inputValue = inputRef.current.value;
            if(inputValue.trim() === ''){
                alert('문자를 입력해야 해요.');
            }else if(!isValidKoreanCombination(inputValue)){
                alert('유효하지 않은 단어에요.');
            }else{
                try {
                    // 로딩 중일 경우 대기
                    if (isLoading) {
                        alert('데이터를 불러오는 중입니다. 잠시만 기다려주세요.');
                        return;
                    }else if (isError){
                        alert('데이터를 불러오는 중 에러가 발생했습니다.');
                        return;
                    }

                    // 결과를 찾았는지 여부 확인을 위한 변수
                    let found = false; 
    
                    // rankSimilarityArr 배열을 순회하며 조건을 검사하고 처리
                    if (rankSimilarityArr) {
                        for (const rs of rankSimilarityArr) {
                            if (inputValue === rs.query) {
                                setResult(rs); // 결과 설정
                                found = true;
                                break; // 반복 중단
                            }
                        }
                    }
    
                    if (!found) {
                        let res = await axios.get(`/api/get/checkAnswer?answer=${inputValue}&date=${formattedTodayDate}`);
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