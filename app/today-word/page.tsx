import rankSimilarity from "@/util/functions/rankSimilarity";

export default async function TodayWord (){
    const topKSimArr = rankSimilarity().filter(
        item => item.rank || 0 >= 100
    );
    console.log(topKSimArr);
    return(
        <div>
            {
                topKSimArr.map(tsa => <p key={tsa.rank}>{tsa.query}</p>)
            }
        </div>
    )
}