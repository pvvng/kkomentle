import insertAnswer from "@/util/functions/insertAnswer";

export default async function Home() {

  // 오늘의 단어 업데이트하는 문장
  await insertAnswer('샌드위치');

  return (
    <form action="http://localhost:3000/api/get/checkAnswer" method="GET">
      <input name="answer" />
      <button type="submit">추측하기</button>
    </form>
  );
}

