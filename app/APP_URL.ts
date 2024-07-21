/** APP URL을 지정하면서 서버 컴포넌트에서의 http 통신을 용이하게 한다
 * 
 * 특정 http 통신은 클라이언트 컴포넌트에서 사용도리 수 있으니 PUBLIC이 붙지 않은 url도 준비한다
 */
const APP_URL = process.env.NEXT_APP_URL || process.env.NEXT_PUBLIC_APP_URL

export default APP_URL;