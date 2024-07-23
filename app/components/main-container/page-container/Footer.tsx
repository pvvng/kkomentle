'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function Footer(){

    const {data, isError} = useQuery({
        queryKey : ['test'],
        queryFn : fetchYesterdayWord,
    })

    async function fetchYesterdayWord() {
        try {
            let res = await axios('/api/word/yesterdayWord');
            return res.data;
        } catch (error) {
            console.error('Error fetching yesterday\'s word:', error);
            return error;  
        }
    }

    return(
        <>
            <hr/>
            <p className="mt-3 mb-3 header-title"><b>질문과 답변</b></p>
            <p><b>Q. 꼬들꼬들은 무엇인가요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">
                    꼬들꼬들은 <a href="https://newsjel.ly/?utm_source=semantle_ko&utm_medium=top_banner">뉴스젤리</a>에서 제작한 <a href="https://semantle-ko.newsjel.ly/">꼬맨틀 - 단어 유사도 추측 게임</a>에서 영감을 받아 제작된 오늘의 단어를 맞히는 게임입니다. 
                </li>
                <li className="mb-1">
                    정답 단어를 추측하면, 추측한 단어가 정답 단어와 얼마나 유사한지 유사도 점수로 알려줍니다. 가장 유사한 단어의 유사도와 가까운 단어를 추측하면서, 정답 단어를 맞혀보세요.
                </li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 정답 단어에는 어떤 단어가 포함되어 있나요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">
                    정답 단어는 명사뿐만 아니라 동사, 형용사 등 모든 품사를 포함하며, 품사의 기본형만 해당합니다.
                    <br/>
                    <span className="mt-1" style={{color : '#666666'}}>예시) 행복, 기쁘다, 사랑하다, 야옹, 그래도, 갑자기</span>
                </li>
                <li className="mb-1">
                    정답 단어는 <a href="https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Korean_5800">Wiktionary</a>에서 자주 쓰이는 한국어 낱말을 가져와 두 글자 이상의 단어만을 추출, 임의 선택합니다. 정답 단어는 모두 두 글자 이상이지만, 전략적인 이유로 한 글자 단어를 추측해볼 수 있습니다.
                </li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 유사도는 무엇인가요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">
                    꼬들꼬들에서 추측한 단어와 정답 단어가 의미맥락적으로 얼마나 비슷한지에 대한 정도를 -100에서 +100까지의 숫자로 계산한 점수입니다. +이면서, 숫자가 클수록 유사한 정도가 크다고 이해할 수 있습니다.
                </li>
                <li className="mb-1">유사도 추정을 위해 꼬들꼬들에서는 <a href="https://platform.openai.com/docs/guides/embeddings">openAI 임베딩 API</a>를 사용하였습니다.</li>
                <li className="mb-1">꼬들꼬들에서는 정답 단어와 가장 비슷한 1,000개의 단어 안에 추측한 단어가 있을 때, 단어의 유사도 순위를 함께 제공합니다.</li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 정답 단어와 유사도가 높은 단어, 왜일까요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">꼬들꼬들의 유사도는 단어의 철자의 유사도가 아닌, 의미에 대한 유사도라는 점을 기억해주세요. 의미적 맥락을 고려해볼 때 정답 단어와 같은 문단 혹은 문장에 언급될 법한 단어로 추측해보세요.</li>
                <li className="mb-1">의미적으로는 반대의 의미를 갖더라도, 유사한 맥락에 사용된다면 유사도가 비슷하답니다. &apos;사랑&apos;과 &apos;증오&apos;는 의미상으로 반대되는 것처럼 보일 수 있지만, 같은 맥락에서 자주 사용되기 때문에 종종 비슷한 유사도를 갖습니다.</li>
                <li className="mb-1">동음이의어를 고려해주세요. 예를 들어 ‘밤’ 하면 쉽게 떠오르는 2가지 의미 - 어두운 &apos;밤&apos;, 가을에 따먹는 &apos;밤&apos;- 중 정답 단어와 의미맥락적으로 비슷한 밤은 어떤 의미일지 추측해보세요.</li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 그래도 유사도가 이해되지 않을 때에는 어떻게 하죠?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">정답 단어를 맞힌 뒤에도 추측 단어는 계속 입력할 수 있습니다. 정답 단어와 유사하다고 생각되는 다른 추측 단어를 입력해보면서, 유사도를 확인해보세요.</li>
                <li className="mb-1">정답 단어를 맞혔을 때 함께 제공되는 유사도 기준 상위 1,000개의 단어를 살펴보세요. 정답 단어와 유사한 정도가 큰 단어들을 살펴보다 보면, 유사도에 대한 이해도 높이고 정답 단어에 도달하기까지 추측 횟수도 줄일 수 있을 거예요.</li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 하루에 한 번 이상 플레이할 수는 없나요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">꼬들꼬들은 하루에 한 번만 플레이 할 수 있습니다</li>
                <li className="mb-1">정답 단어는 국제 표준시(UTC) 기준 매일 오후 3시 또는 한국 표준시(KST) 기준 자정에 바뀝니다.</li>
            </ul>
            <div style={{clear : 'both'}}></div>

            <p><b>Q. 어제의 정답은 무엇인가요?</b></p>
            <p className="float-start">A.</p>
            <ul className="mx-4">
                <li className="mb-1">
                    어제의 정답 단어는 &quot;
                    {
                        data !== undefined?
                        <b>{data.yesterday}</b>:
                        isError ? <b>에러 발생</b>:
                        <b>???</b>
                    }
                    &quot;입니다.
                </li>
            </ul>
            <div style={{clear : 'both'}}></div>
            <hr/>
            <p>
                꼬들꼬들은 David Turner의 <a href="https://semantle.novalis.org/">Semantle</a>과 Johannes Gätjen의 <a href="http://semantlich.johannesgaetjen.de/">Semantlich</a>를 바탕으로 데이터 시각화 전문기업 <a href="https://newsjel.ly/?utm_source=semantle_ko&utm_medium=footer_link">뉴스젤리</a>가 만든 꼬맨틀을 바탕으로 만들었습니다.
            </p>
        </>
    )
}