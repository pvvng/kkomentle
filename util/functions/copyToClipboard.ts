/** 클립보드에 텍스트 복사하는 함수 */
export default async function copyToClipboard (textToCopy :string){
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('클립보드에 복사했습니다.');
    } catch (error) {
      console.error('복사에 실패했습니다.', error);
    }
};