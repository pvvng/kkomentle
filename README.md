2024.07.10 ~

2024.07.20 realease
[0.1 버전](https://kkodle-kkodle.netlify.app/)

### 개선사항 2024.07.20 이전

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
#### ~18. 너무 어렵다는 평가가 많음. 힌트 지급 고려하기~
  - 유사도 10위 단어 알려주는 힌트 추가
  - 그래도 어렵다는 평가 많다. 어쩌지?
  - 추가 난이도 테스트 필요

### 개선사항 2024.07.30 이후

> 해결한 문제는 ~취소선으로~ 표시
> 
> 해결되지 않은 문제는 **굵게** 표시

#### ~1. 웹, PWA 처음 실행할 때, 흰 화면이 1~3초 정도 지속된다.~
  - splash screen을 추가했다.
#### ~2. 모바일에서 input 클릭 시 자동 확대되는 문제.~
  - input의 font-size가 16px 이하여서 자동 확대 되는거였음.
  - input의 텍스트를 항상 16px로 조정하면서 문제 해결
#### ~3. 나의 플레이 기록에서 상위 백분위 몇펀지 계산해서 보여주고, kakao로 공유할 수 있도록 하기.~
  - kakao 공유하기 기능 구현 완료
  - 백분위 tooltip에 기록
  - 다만, 상위 백분위 몇펀지 공유하는 건 포기. 깔끔하게 카카오 공유만 가능하게
  - 나중에 기회 되면 다시 시도 해보자
#### ~4. 특정 조건 완수하면 뱃지 지급받도록 하기.~
  - db userdata에 뱃지 보유 상태 저장함. 보유하지 않은 뱃지는 프로필 이미지로 선택이 불가능하게 막아놓음.
  - 총 5가지 뱃지를 특정 조건 완료 시 얻을 수 있도록 기능 구현 완료.
    >
    > 기본 : 회원가입 시 지급
    > 
    > 별 : 힌트 최초 사용시 지급
    > 
    > 유령 : 최초 클리어시 지급
    > 
    > 악동 : 10분 안에 클리어시 지급
    > 
    > 악마 : 3트 안에 클리어시 지급
#### ~5. 로그인 전 localstorage에 저장된 요소가 로그인 후 db에 저장되게 하는 방안 고려하기~
  - 개발 상 문제로 -관-
#### ~5. sw 조작해서 다운로드 푸쉬 알람 띄우기~
  - 이거 sw조작해서 하는게 아니라 beforeinstallprompt event를 조작해서 하는 거였다. ios에서는 beforeinstallprompt가 제대로 동작하지 않으니, 사용자 디바이스가 ios인지 확인하고, ios면 설치 방법 설명해주는 alert box 보여주고, 아니면 다운로드 alert box 보여주는 방식으로 구현했다. 더블클릭하면 alert box 안보이도록 설정함. 
#### ~6. 정답을 맞힌 직후 클리어 박스에 indexgusses가 -1로 표시된다. router.refresh 하면 정상적으로 보이긴 한다~
  - main page가 static rendering 중이어서 db 변경되는 값을 즉각적으로 반영하지 못해 발생하는 문제였다.
  - export const dynamic = 'force-dynamic'; 추가함으로서 main page를 dynamic rendering 시켜서 문제 해결
#### ~7. 랭크 페이지 구현하기~
  - playtime 이 0일때 1000점, tryCount가 1일 때 1000 점으로 기준을 잡고, playtime이 10(분) 커질때마다 -1 점, trycount가 1 늘어날때마다 -1 점 해서 점수를 계산한다
  - 점수가 높은 순서대로 20개 불러와서 리스트를 만든다
#### **~8. localstorage에 쿼리 저장이 안되는 것 같음~ localstorage에 gusses가 저장되고, mongoDB에도 무사히 저장되었으나, 메인페이지에서 다른 페이지로 이동하고, 다시 메인페이지로 돌아오면 직전 gusses로 롤백됨. 아마 mongoDB에 저장된 gusses가 정상적으로 업데이트 되지 않는듯**
  - MainContainer(부모) 컴포넌트와 TableContainer(손자) 컴포넌트의 렌더링 시간의 문제였다.
  - MainContainer 컴포넌트는 렌더링 될때마다(useEffect : []) zustand store에 userdata를 저장한다(이후 zustand store에 저장된 userdata는 nowUserData라 지칭).
  - TableContainer 컴포넌트에서 사용되는 useHandleLocalstorage 커스텀 훅에선 렌더링 될 때마다(useEffect : []) localstorage에 nowUserData를 덮어씌운다. (정확히는 useUpdateLocalStorageByDBData 훅 을 useHandleLocalstore에서 사용해서 그럼)
  -  계획한 대로 동작하게 하려면 우선 MainContainer가 먼저 렌더링 되어 변경된 userdata 가 nowUserData 로 변해야함
  -  nowUserData가 변한 후, localstorage에 변경점이 적용 되어야함.
  -  여기서 문제가 생김. 메인페이지(/)에서 다른 페이지로 이동 후, 다시 메인페이지로 이동하면 TableContainer가 먼저 실행되고, 이후 MainContainer가 실행됨.
  -  그래서 TableContainer가 먼저 렌더링 되어 userdata가 nowUserData로 변하는 과정이 뒤늦게 일어나고, localstorage에 변경점이 적용되지 않았음.
  -  TableContainer가 먼저 렌더링 되는 이유는 알 수 없음. 다만, TableContainer에서 localstorage에 nowUserData를 덮어씌우는 과정에 대한 종속성을 기존 렌더링[] 에서 [nowUserData] 로 변경함.
  -  이렇게 하면 TableContainer의 렌더링이 MainContainer보다 빠르게 일어나도 nowUserData의 변경점을 찾지 못함으로 localstorage에 변경점이 적용되지 않음. 
#### ~9. android에서 PWA 다운 alert box가 간혹 보이지 않음~
  - chrome이 아니라 네이버, 카카오에서 꼬들꼬들을 실행하면 해당 문제가 발생함.
