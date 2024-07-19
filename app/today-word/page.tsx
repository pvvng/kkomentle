import rankSimilarity from "@/util/functions/rankSimilarity";

export default async function TodayWord (){
    const topKSimArr = rankSimilarity().filter(
        item => item.rank >= 100
    );

    return(
        <div>
            {
                topKSimArr.map((tsa, i) => <p key={tsa.rank}>{i}{tsa.query}</p>)
            }
        </div>
    )
}