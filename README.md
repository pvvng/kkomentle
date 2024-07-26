2024.07.10 ~

2024.07.20 realease
[0.1 버전](https://kkodle-kkodle.netlify.app/)

### 개선사항 2024.07.20 이후

> 해결한 문제는 ~취소선으로~ 표시
> 
> 해결되지 않은 문제는 **굵게** 표시

#### ~1. input 검열 조건 조금 더 빡빡하게, 영어 안되게, 한글 초성, 숫자 거르기~
  - isValidKoreanCombination 함수 추가해서 숫자, 영어, 초성 거르게 함.

#### ~2. 왠지 모르겠는데 배포 이후에 Network 속도가 느려짐. 원인 찾아서 해결하기~
  - 유사도 순위를 정답과 비교할 때, db에 저장된 유사도 순위를 찾고 => 없으면 직접 유사도 산출하기 방식으로 하는데 첫번째 과정이 1.3초가량 걸리고 두번째 과정이 0.5초 가량 걸린다.
  - React Query를 사용해서 db에 저장된 유사도 순위를 불러오는 함수 (rankSimilarlity)의 값을 캐싱함. 이후 속도가 확연히 개선되었음.
  
#### ~3. 사용자의 순위 저장해서 데이터 입수하기~
  - 사용자 회원가입 기능 구현 완료
  - 로그인 한 경우에 승리 / 포기 시 DB에 데이터 저장

#### ~4. 포기한 후 정답을 다시 입력하면 포기 => 정답맞힘 으로 상태가 변경되는 오류가 있다.~
  - useHandleLocalstorage 훅에서 현재 정답 상태와 관계 없이 정답이 입력되면 상태를 정답으로 변경했기 때문에 발생한 문제였다.
  - 현재 상태가 포기라면 상태 변경을 막는 방식으로 변경하니 오류가 해결되었다.
  
#### ~5. 새로 고침시 포기한 부분의 인덱스 넘버가 잘못 표기되는 오류가 있다.~
   - 포기 버튼을 눌렀을 때, 정답 객체가 localstorage에 추가되지 않아서, 포기한 이후에 정답을 입력하면 늦게 입력한 정답의 index가 적용되기 때문이었다.
   - 포기 버튼을 누르면 정답 객체를 localstorage에 추가하도록 코드를 추가하여 오류를 해결하였다.

#### ~6. 정답을 한번만에 맞혀버리면 playtime이 현재시간으로 설정되는 오류가 있다.~
   - starttime이 정의되지 않아서 생긴 문제이다. starttime이 undfiend일 경우 기본값인 0이 되도록 설정했는데, endtime(시작시간)-starttime(0)을 해버리니 playtime이 시작시간이 되었다.
   - starttime의 기본값을 endtime과 동일하게 설정하여 오류를 해결하였다.

#### ~7. 쿠키에 저장한 darkmode 데이터를 불러올 때 시간이 1초 가량 걸린다.~
  - 메인 페이지 (page.tsx)에 Promise가 많아서 refresh 될 때 페이지를 다시 불러오는 데 시간이 오래 걸리는 것이 원인이었다. Promise 함수를 client component 인 MainContainer에서 동작하도록 설정한다.
  - 1. page.tsx에서 쿠키를 받아온다. mainContainer에게 props로 쿠키의 값을 받아온다.
    2. MainContainer(client component)에서 zustand store에 쿠키의 값을 저장한다.
    3. 만약 mainContainer에서 받은 쿠키 props가 undefined면 쿠키를 추가한다.
    4. router.refresh() 해서 pages.tsx가 업데이트 된 쿠키를 받아오도록 설정한다.
    5. 이런 과정을 통해 모든 컴포넌트에서 통일된 쿠키를 사용 가능하다.
#### ~8. 카카오 로그인 구현.~
#### **9. 웹, PWA 처음 실행할 때, 흰 화면이 1~3초 정도 지속된다.**
#### **10. 모바일에서 input 클릭 시 자동 확대되는 문제.**
#### ~12. 시간 업데이트가 제대로 되지 않는 문제~
  - moment-timzone 라이브러리를 사용해서 1. 사용자 디바이스의 시간 받고 2. 한국시로 포맷하여 사용. 하는 코드 추가. 테스트 필요함.
  - 정상 작동 확인
#### ~13. 또한 특정 버튼 크기나 radius가 이상해짐~
  - 버튼 수정 완료.
#### ~14. clipboard에서 playtime 이상하게 표시됨~
  - 로그인 하고 문제 풀면 localstorge에 저장되는 값을 db에도 저장하도록 로직을 변경하면서 playtime과 guessesword index의 문제 모두 해결함
#### ~15. 어제 오늘 내일의 정답을 출력하는 API에서 어제, 오늘의 정답이 중복되거나, 특정 단어를 건너뛰는 문제가 생김~
  - moment-timezone을 사용해서 한국시로 포맷했는데, 해당 API는 포맷을 하지않아 시차가 발생하여서 생기는 문제로 추정된다.
  - 수정은 했는데 테스트 필요
  - 테스트 성공
#### **16. 나의 플레이 기록에서 상위 백분위 몇펀지 계산해서 보여주고, kakao로 공유할 수 있도록 하기.**
#### **17. 특정 조건 완수하면 뱃지 지급받도록 하기.**
