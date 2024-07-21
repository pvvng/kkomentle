import rankSimilarity from "@/util/functions/rankSimilarity";
import Link from "next/link";

export default async function TodayWord (){

    const topKSimArr = await rankSimilarity();
    const filterdArr = topKSimArr.filter(
        item => typeof item?.rank === 'number' && item?.rank <= 1000
    );

    return(
        <div className="p-2">
            <p>
                <Link href='/'>메인 화면으로 돌아가기</Link>
            </p>
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
                                    <td className="text-center">{(tsa.similarity * 100).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}