import OpenAI from "openai";

// OpenAI API Key
const apiKey = process.env.OPENAI_SECRET_KEY;
// OpenAI 라이브러리 호출
const openai = new OpenAI({ apiKey : apiKey });

/** 특정 단어의 임베딩을 얻는 함수 */
export default async function getEmbedding(inputText: string) {
    try {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: inputText,
        encoding_format: "float",
      });
  
      return embedding.data[0].embedding;
  
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw new Error("Failed to retrieve embedding from OpenAI");
    }
  }