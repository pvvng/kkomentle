/** input의 단어 검열하는 함수 */
export default function isValidKoreanCombination(text :string) {
    // 음절이 조합 가능한지 확인하는 정규 표현식
    const validKoreanRegex = /^[가-힣]+$/;
  
    // 한글 음절만 포함되어 있는지 확인
    if (!validKoreanRegex.test(text)) {
      return false;
    }
  
    // 유효한 음절 조합인지 확인
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const code = char.charCodeAt(0);
      // 유효한 한글 음절 범위인지 확인
      if (code < 0xAC00 || code > 0xD7A3) {
        return false;
      }
    }
  
    return true;
}