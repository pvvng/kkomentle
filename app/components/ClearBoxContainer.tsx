'use client'

export default function ClearBoxContainer(){
    return(
        <div className="p-3 mt-3" style={{border: '1px solid', background : '#eeeeff'}}>
            <b>정답 단어를 맞혔습니다. 20번째 추측만에 정답을 맞혔네요!</b>
            <br/>
            <span>정답 단어와 비슷한, <a href="">상위 1,000개의 단어</a>를 확인해보세요.</span>
            <button className="border-1 rounded-1 pt-1 pb-1 mt-2 mb-2">기록 복사하기</button>
            <br/>
            <span>837번째 꼬맨틀은 오늘 밤 자정(한국 시간 기준)에 열립니다.</span>
        </div>
    )
}