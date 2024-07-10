// import insertAnswer from "@/util/functions/insertAnswer";

export default async function Home() {

  // 오늘의 단어 업데이트
  // await insertAnswer('포스트잇');

  return (
    <form action="http://localhost:3000/api/get/checkAnswer" method="GET">
      <input name="answer" />
      <button type="submit">보내기</button>
    </form>
  );
}

