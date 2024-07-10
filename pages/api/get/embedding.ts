import getEmbedding from "@/util/functions/getEmbedding";
import { NextApiRequest, NextApiResponse } from "next";

/** request로 들어온 단어의 임베딩을 리턴하는 서버 api */ 
export default async function handler(req :NextApiRequest, res :NextApiResponse){
  
  // 사용자의 쿼리가 문자열 배열인 경우 첫 번째 요소를 문자열로 추출
  const answer = Array.isArray(req.query.answer) ? req.query.answer[0] : req.query.answer || '';

  if(req.method === "GET"){
    try{
      let embedding = await getEmbedding(answer);
      return res.status(200).json(embedding);
    }catch(error){
      console.error("Error in get embedding:", error);
      return res.status(500).json({ error: "Failed to get embedding" });
    }
  }else{
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}