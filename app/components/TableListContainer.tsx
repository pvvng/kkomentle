'use client'

import { JsonSimilarityType } from "@/util/hooks/useHandleLocalstorage";

interface PropsType {
    tableData: JsonSimilarityType;
    type : string 
}

export default function TableListContainer({tableData, type} :PropsType){

    console.log(tableData);

    return(
        <tr key={tableData.index}>
            <td style={{fontWeight: 400}}>{tableData.index}</td>
            {
                type === 'input'?
                <td style={{color: '#f7617a', fontWeight: 600}}>{tableData.query}</td>
                :<td style={{fontWeight: 400}}>{tableData.query}</td>

            }
            <td style={{fontWeight: 400}}>{tableData.similarity}</td>
            <td style={{fontWeight: 400}}>
                {
                    tableData.rank === '???' || tableData.rank === '1000위 이하'?
                    <span>{tableData.rank}</span>:
                    <div className="text-end w-100">
                        {
                            typeof tableData.rank === 'number' && tableData.rank !== 0 ? 
                            <div className="progress" style={{width : '100%', margin:'auto', display : 'inline-block'}}>
                                <div className="progress-bar" style={{width : `${((1000 - tableData.rank) / 10)}%`, height:'16px' }}>{tableData.rank}위</div>
                            </div>:
                            <span className="float-start" style={{fontWeight : 600, color : '#0D6EFD'}}>정답!</span>
                        }
                        <div style={{clear : 'both'}}></div>
                    </div>
                    
                }
            </td>
        </tr>     
    )
}