export default function TableContainer(){
    return(
        <table className="w-100 mt-4">
            <tbody>
                <tr>
                    <th>#</th>
                    <th>추측한 단어</th>
                    <th>유사도</th>
                    <th>유사도 순위</th>
                </tr>
                {/* 현재 입력한 값 */}
                <tr>
                    <th style={{fontWeight: 400}}>3</th>
                    <th style={{color: '#f7617a', fontWeight: 600}}>단어</th>
                    <th style={{fontWeight: 400}}>유사도</th>
                    <th style={{fontWeight: 400}}>유사도 순위</th>
                </tr>
                {/* 이하반복 */}
                <tr>
                    <td colSpan={4}>
                        <hr/>
                    </td>
                </tr>
                {/* 이전에 입력한 값 (map) / 유사도 높은 순대로 */}
                <tr>
                    <th style={{fontWeight: 400}}>1</th>
                    <th style={{color: '#f7617a', fontWeight: 600}}>단어</th>
                    <th style={{fontWeight: 400}}>유사도</th>
                    <th style={{fontWeight: 400}}>유사도 순위</th>
                </tr>
                <tr>
                    <th style={{fontWeight: 400}}>2</th>
                    <th style={{color: '#f7617a', fontWeight: 600}}>단어</th>
                    <th style={{fontWeight: 400}}>유사도</th>
                    <th style={{fontWeight: 400}}>유사도 순위</th>
                </tr>
            </tbody>
        </table>
    )
}