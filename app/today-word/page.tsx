import rankSimilarity from "@/util/functions/rankSimilarity";

export default async function TodayWord (){

    const topKSimArr = rankSimilarity()
    const filterdArr = topKSimArr.filter(
        item => typeof item?.rank === 'number' && item?.rank <= 1000
    );

    return(
        <table>
            <tbody>
                <tr className="text-center w-100">
                    <th className="col-4">유사도 순위</th>
                    <th className="col-4">단어</th>
                    <th className="col-4">유사도</th>
                </tr>
                {
                    filterdArr.map((tsa, i) => {
                        return (
                            <tr key={tsa.rank}>
                                <td>{i}</td>
                                <td className="text-center">{tsa.query}</td>
                                <td className="text-center">{(tsa.similarity * 100).toFixed(0)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}