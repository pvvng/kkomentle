import type { Handler } from "@netlify/functions";

export const handler :Handler = async (event, context) => {
    const headers = {
      'Content-Type': 'application/json',
      'Set-Cookie': 'cookieName=cookieValue; Path=/; HttpOnly; Secure; SameSite=Lax'
    };
  
    const body = {
      message: '쿠키가 설정되었습니다!',
    };
  
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(body),
    };
  };
  