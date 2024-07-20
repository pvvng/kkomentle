import rankSimilarity, { SimilarityType } from "@/util/functions/rankSimilarity";

/** 1, 10, 1000 번째에 랭크된 유사어 어레이로 뽑는 함수 */
export default async function getOneTenAndKSimilarlity(){

    let firstTenK:SimilarityType[] = [];

    let topRanking = await rankSimilarity();
    topRanking.map (tr => {
        if (tr.rank === 1 || tr.rank === 11 || tr.rank === 1001){
            tr = { ...tr,  }
            firstTenK.push({...tr, similarity : parseFloat((tr.similarity * 100).toFixed(2))});
        }
    })
    return firstTenK;
}