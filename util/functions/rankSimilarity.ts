import APP_URL from "@/app/APP_URL";
import axios from "axios";

/** similar words object type */
export interface SimilarityType {
    query: string;
    similarity: number;
    rank ?: number|string;
    time ?: number;
}

/** 유사도 순으로 나열하고, 등급 매기는 함수 (클라이언트 컴포넌트에서 사용) */
export default async function rankSimilarity():  Promise<SimilarityType[]> {

    console.log(APP_URL)

    let getTodaySimilar = await axios(`${APP_URL}/api/get/todaySimilar`);

    // SIMILARITY 배열을 복사하여 새로운 배열을 생성
    const sortedSimilarity: SimilarityType[] = [...getTodaySimilar.data].sort((a, b) => b.similarity - a.similarity);
    // 각 객체에 rank 속성을 추가하고, 그 결과를 반환
    const rankedSimilarity = sortedSimilarity.map((obj, index) => ({
        ...obj,
        rank: index // index는 0부터 시작하여 순위를 나타냄
    }));

    return rankedSimilarity;
}