# 단어 유사도 추측 게임 - 꼬들꼬들 README 

## 1. 설치 방법

### click and move 👉 [웹으로 보기 or 다운로드](https://kkodle-kkodle.netlify.app/)

## 2. 개요
- 프로젝트 이름 : 단어 유사도 추측 게임 - 꼬들꼬들
- 개발 기간 : 2024.07.10 ~ 2024.08.04
- 개발 환경 : Next.js, Typescript, mongoDB, openAI
- 작업 관리 : Git (GitFlow)
- 배포 : Netlify
- #### installed Library
        @tanstack/react-query
        openai
        cosine-similarity
        zustand
        axios
        moment
        next-auth
        next-pwa
        recharts
        react-bootstrap
        fontawesome

## 3. 프로젝트 설명
- #### open AI의 embedding API로 얻은 단어 유사도로 오늘의 정답을 추측하는 게임입니다.
  - [꼬맨틀](https://semantle-ko.newsjel.ly/)에서 영감을 받아 제작되었습니다. 기본적인 레이아웃은 꼬맨틀을 참고하였습니다.
 
- #### TypeScript로 타입 에러 제어
  - TypeScript를 사용하여 Type Error로 인한 사고 발생을 미연에 방지하고자 하였습니다.
 
- #### Zustand를 활용한 전역적 상태 관리
  - 기존에 전역 상태 관리 라이브러리로 redux-toolkit을 사용하였는데, 이 프로젝트에선 비교적 문법이 쉽고 가벼운 Zustand를 사용해보았습니다.

- #### React-Query를 이용한 효율적인 비동기 통신 처리
  - React-Query(Tanstack-Query) 를 사용하여 좀 더 효과적인 비동기 통신 처리를 지향했습니다.
  - 특히, 통신이 로딩 중이거나 에러가 발생했을때의 처리나, 캐싱 기능 등을 주로 활용했습니다.
 
- #### Kakao 소셜 로그인
  - Kakao 소셜 로그인이 가능하며, 별도의 로그인 페이지도 구현하였습니다.

- #### localstorage에 게임 데이터 저장
  - 게임의 플레이 정보 (정답을 맞혔는지, 추측 단어들의 배열, 플레이 시간, 오늘 날짜) 등을 localstorage에 저장하였습니다.
  - 로그인 한 경우 localstorage에 저장됨과 동시에 DB에도 플레이 정보를 저장하여 다른 디바이스에서 로그인하여도 같은 플레이 정보를 확인 가능하도록 설정하였습니다. 
 
- #### PWA로 네이티브 앱 처럼 다운 가능
  - PWA를 사용하여 네이티브 앱 처럼 홈 화면에 추가 가능합니다.
 
## 4. 이용 방법과 주요 기능
### 4-0. 로그인
<div align='center'>
    <img src='https://github.com/user-attachments/assets/01793d96-ded0-4399-a514-28825b3e1146' width='48%' />
</div>

- Navbar의 로그인 버튼을 눌러 로그인 페이지로 이동합니다.
- next-auth 의 소셜 로그인을 활용하여 Kakao Login이 가능합니다.
- 만약 회원가입되지 않은 사용자 (db에 없는 사용자) 가 로그인했다면 자동으로 회원가입이 이루어집니다.

- - - 
### 4-1. 메인페이지
##### 기본 기능 (단어 입력)

<div align='center'>
    <img src='https://github.com/user-attachments/assets/d005dd57-d578-4dec-9443-c50843421a43' width='48%' />
    <img src='https://github.com/user-attachments/assets/d2b9f0a8-c548-4fd0-b06a-cec12513c517' width='48%' />
</div>

- 처음 꼬들꼬들에 접속하면 보이는 화면입니다.
- input에 값을 입력하여 오늘의 정답 단어와 입력한 값 사이의 유사도를 아래의 표에서 보여줍니다.

##### 기본 기능 (추측 단어 표)
<div align='left'>
    <img src='https://github.com/user-attachments/assets/14514829-791c-4b64-9f3a-3c41df6b02aa' width='48%' />
</div>

- 추측 단어 표는 유사도가 높은 순서대로 정렬됩니다.
- 유사어 텍스트 파일에 등록된 단어를 사용자가 입력하면 미리 DataBase에 저장된 오늘의 정답에 대한 유사도를 표로 반환합니다.
- 또한, 유사어 텍스트 파일에 등록된 단어는 1~1000위까지 정답 단어와 유사한 순위가 기록되어 있기 때문에 순위를 progress bar로 표현한 박스를 확인 가능합니다. 
- 유사어 텍스트 파일(약 5600개의 유사어가 등록되어 있습니다.)에 등록되지 않은 단어를 사용자가 입력하면 openAI Embedding API를 사용해서 정답 단어에 대한 유사도를 표로 반환합니다. 이때 순위는 "???" 로 확인 가능합니다.
- 정답 단어는 "정답" 텍스트로 확인 가능합니다.
##### 기본 기능 (라이트모드 / 다크모드)
<div align='center'>
    <img src='https://github.com/user-attachments/assets/e5bfd189-d875-4fba-b28e-e657710aa6f1' width='48%' />
</div>

- 상단 세팅 버튼 (기어 이모지)를 클릭하여 라이트모드 / 다크모드 변경 및 클립 보드에 저정할 요소를 커스텀 할 수 있습니다.
  
##### PWA 알림창
<div align='center'>
    <img src='https://github.com/user-attachments/assets/f107650a-7570-4653-afa1-b1cf2f53c577' width='31%' />
      <img src='https://github.com/user-attachments/assets/55c638f2-72c3-497a-8af2-695ecbf21195' width='31%' />
    <img src='https://github.com/user-attachments/assets/3111a346-d26a-480c-901f-c41c85132895' width='31%' />
</div>

- PWA 설치 알림창입니다.
- 첫번째 : android/(chrome, edge, firefox, opera 브라우저)
- 두번째 : ios
- 세번째 : android/(기타 브라우저)

- android 알림창을 분리한 이유는 chrome, edge, firefox, opera 브라우저에서만 beforeinstallprompt 이벤트가 동작하기 때문입니다.
- 네이버 인앱, 카카오 인앱에서 웹을 실행하는 경우엔 chrome 브라우저로 강제 리다이렉트 됩니다.

##### 힌트 사용
<div align='center'>
    <img src='https://github.com/user-attachments/assets/eafe6ca5-c846-4d5e-9f87-a89187efb1e5' width='48%' />
</div>

- 힌트 사용 버튼을 클릭하면 confirm 알림창이 표시됩니다.
- 힌트 사용을 승낙한다면 오늘의 단어와 10번째로 유사한(유사도 10위) 단어를 얻습니다.
- 힌트는 언제든 다시 확인 가능합니다.
- 힌트 사용 후 문제를 해결하면 총 점수 부분에서 패널티가 주어집니다 (-500점)

##### 포기 
<div align='center'>
    <img src='https://github.com/user-attachments/assets/316ed903-ccf6-49f5-93e1-74aafdfdf148' width='48%' />
    <img src='https://github.com/user-attachments/assets/d6e3136f-488f-4dea-a624-b8287638d7bb' width='48%' />
</div>

- 포기 버튼 클릭 시 "포기 박스" 가 화면에 표시됩니다.
- 포기 박스에는 오늘의 정답과 포기하기 전까지의 게임 플레이 데이터 등이 표시됩니다.
- 포기 박스의 상단 우측 새로고침 버튼을 누르면 해당 박스를 리렌더링합니다
- 포기 박스의 상단 상위 1000개의 단어 <a> 태그를 클릭하면 오늘의 유사어 1000 페이지로 이동합니다.
- 카카오톡 로고 버튼을 클릭하면 카카오톡 share 페이지로 이동합니다.

##### 클리어
<div align='center'>
    <img src='https://github.com/user-attachments/assets/78d57cec-5960-4d40-870d-adc5f6d41ef5' width='48%' />
    <img src='https://github.com/user-attachments/assets/b928d56b-d6d4-4110-8f11-6a908bbe1e4e' width='48%' />
</div>
- 정답을 맞혔을 경우 "성공 박스" 가 화면에 표시됩니다.
- 성공 박스에는 오늘의 정답과 맞하기 전까지의 게임 플레이 데이터 등이 표시됩니다.
- 성공 박스의 상단 우측 새로고침 버튼을 누르면 해당 박스를 리렌더링합니다
- 성공 박스의 상단 상위 1000개의 단어 <a> 태그를 클릭하면 오늘의 유사어 1000 페이지로 이동합니다.
- 카카오톡 로고 버튼을 클릭하면 카카오톡 share 페이지로 이동합니다.

##### 플레이 데이터 그래프
<div align='center'>
    <img src='https://github.com/user-attachments/assets/a51f1e2f-877a-465e-aca3-30a9c7129704' width='48%' />
    <img src='https://github.com/user-attachments/assets/231ca585-9641-4f22-8bdb-2e770bac1713' width='48%' />
</div>

- 로그인 한 경우에만 포기 박스 / 성공 박스에서 볼 수 있는 그래프입니다.
- 오늘을 기준으로 지난 일주일 간 모든 유저의 플레이 데이터와, 플레이 데이터를 기준으로 얻은 사용자의 데이터를 보여줍니다.
- 그래프는 recharts 라이브러리를 사용하였습니다.

- - -
### 4-2. 랭킹페이지
<div align='center'>
    <img src='https://github.com/user-attachments/assets/dd85d871-2088-42cd-b0cb-3e4c0edb4e1a' width='48%' />
</div>

- 오늘의 랭킹이 표시되는 페이지입니다.
- 랭킹은 게임 시간, 시도 횟수, 힌트 사용 여부 등을 합산하여 산출됩니다.
- 뱃지로 커스텀한 프로필을 랭킹 페이지에서 사용 가능합니다.
- 만약 로그인 하지 않은 유저가 게임을 클리어 했다면, "user + 무작위 문자/숫자 조합 5자리" 가 사용자 이름으로 설정됩니다.
- 또한 로그인 하지 않은 유저는 프로필 뱃지가 "기본 꼬들꼬들" 로 고정됩니다.

- - -
### 4-3. 마이페이지
<div align='center'>
    <img src='https://github.com/user-attachments/assets/2a2957c7-4353-44ee-8f02-14e214b92a11' width='31%' />
      <img src='https://github.com/user-attachments/assets/5a20c24e-9382-4a6c-a2a7-9c30dd3bf16b' width='31%' />
    <img src='https://github.com/user-attachments/assets/f2703ce0-1488-499a-b1bb-19b299b950f9' width='31%' />
</div>

- 마이페이지에서 이름과 뱃지 프로필을 수정가능합니다.
- 이름에는 숫자, 영어, 한글만 허용되며 다른 특수 문자는 허용되지 않습니다.
- 보유하지 않은 뱃지는 가려진 채로 보입니다.
- 보유하지 않은 뱃지를 프로필로 설정하는 것은 불가능합니다.
- 뱃지는 게임 플레이 도중 특수 조건을 만족하면 자동으로 획득 가능합니다.
  
- - -
### 4-4. 질문과 답변 페이지
<div align='center'>
    <img src='https://github.com/user-attachments/assets/f937e5a0-5284-44bb-98f3-bd51a930c376' width='48%' />
</div>

- [꼬맨틀 메인페이지](https://semantle-ko.newsjel.ly/) 하단에 위치한 질문과 답변을 가져온 페이지입니다.

- - - 
### 4-5. 정답 유사어 1000 페이지

<div align='center'>
    <img src='https://github.com/user-attachments/assets/df267cbe-cc91-4dfd-ae2f-77fe550737e9' width='48%' />
</div>

- 포기 박스 / 클리어 박스 중간에 위치한 상위 1000개의 단어 <a> 태그를 클릭하면 볼 수 있는 페이지입니다. 오늘의 정답 단어와 유사한 단어 1000개를 확인 가능합니다.
- 또한, 포기 / 정답 상태가 아닌 이용자가 해당 url을 입력하면 접근이 차단되게 설정하였습니다.

## 5. 프로젝트 회고

**[velog 시리즈](https://velog.io/@pvvng/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%BC%AC%EB%93%A4%EA%BC%AC%EB%93%A4)**

1. [텍스트 클립보드에 복사시키기](https://velog.io/@pvvng/%EB%B2%84%ED%8A%BC-%ED%81%B4%EB%A6%AD%ED%95%98%EB%A9%B4-%ED%85%8D%EC%8A%A4%ED%8A%B8-%ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EC%97%90-%EB%B3%B5%EC%82%AC%EC%8B%9C%ED%82%A4%EA%B8%B0)
2. [Netlify Function 이용해서 cron job 수행하기](https://velog.io/@pvvng/Netlify-Function-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-cron-job-%EC%88%98%ED%96%89%ED%95%98%EA%B8%B0)
3. [fs, path로 텍스트 파일 해체하기](https://velog.io/@pvvng/fs-path%EB%A1%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%ED%95%B4%EC%B2%B4%ED%95%98%EA%B8%B0)
4. [여러가지 비동기 통신이 동시에 나타났을 때 처리하기](https://velog.io/@pvvng/%EC%97%AC%EB%9F%AC%EA%B0%80%EC%A7%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0%EC%9D%B4-%EB%8F%99%EC%8B%9C%EC%97%90-%EB%B0%9C%EC%83%9D%ED%96%88%EC%9D%84-%EB%95%8C-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)
5. [PWA 다운로드 알림창 띄우기](https://velog.io/@pvvng/PWA-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%95%8C%EB%A6%BC%EC%B0%BD-%EB%9D%84%EC%9A%B0%EA%B8%B0)
6. [Next js 카카오 로그인 구현과 커스텀 로그인 페이지 만들기](https://velog.io/@pvvng/Next-js-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%EA%B3%BC-%EC%BB%A4%EC%8A%A4%ED%85%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0)

## 6. 후기
### 느낀 점
- 꼬들꼬들 많이 해주세요

## 7. 업데이트 및 변동 사항
[2024.08.04 이전 변동사항 확인](https://github.com/pvvng/kkomentle/blob/develop-readme/README.md)
## 8. file tree

    📦app
     ┣ 📂auth
     ┃ ┗ 📂sign-in
     ┃ ┃ ┗ 📜page.tsx
     ┣ 📂components
     ┃ ┣ 📂badge-container
     ┃ ┃ ┣ 📜badge-components.tsx
     ┃ ┃ ┣ 📜badge.css
     ┃ ┃ ┗ 📜getBadgeImageContainer.tsx
     ┃ ┣ 📂hidden-container
     ┃ ┃ ┣ 📜ClearBoxContainer.tsx
     ┃ ┃ ┣ 📜ComposedChartContainer.tsx
     ┃ ┃ ┣ 📜InstallPWAAlertContainer.tsx
     ┃ ┃ ┗ 📜KakaoShareBtn.tsx
     ┃ ┣ 📂loading-container
     ┃ ┃ ┗ 📜LoadingSpinner.tsx
     ┃ ┣ 📂main-container
     ┃ ┃ ┣ 📂page-container
     ┃ ┃ ┃ ┣ 📜Footer.tsx
     ┃ ┃ ┃ ┣ 📜MainContainer.tsx
     ┃ ┃ ┃ ┣ 📜MoveToMainPageImage.tsx
     ┃ ┃ ┃ ┣ 📜Navbar.tsx
     ┃ ┃ ┃ ┣ 📜SettingAlertContainer.tsx
     ┃ ┃ ┃ ┗ 📜SignBtn.tsx
     ┃ ┃ ┣ 📂table-container
     ┃ ┃ ┃ ┣ 📜TableContainer.tsx
     ┃ ┃ ┃ ┗ 📜TableListContainer.tsx
     ┃ ┃ ┗ 📂under-main-container.tsx
     ┃ ┃ ┃ ┣ 📜GaveUpButtoncontainer.tsx
     ┃ ┃ ┃ ┣ 📜Header.tsx
     ┃ ┃ ┃ ┣ 📜InputContainer.tsx
     ┃ ┃ ┃ ┗ 📜RefreshBtnContainer.tsx
     ┃ ┗ 📜SaveSimilarWordsContainer.tsx
     ┣ 📂my-page
     ┃ ┣ 📂components
     ┃ ┃ ┣ 📜LeftProfileContainer.tsx
     ┃ ┃ ┣ 📜profile.css
     ┃ ┃ ┣ 📜Profile.tsx
     ┃ ┃ ┗ 📜RightBadgeArrContainer.tsx
     ┃ ┗ 📜page.tsx
     ┣ 📂QnA
     ┃ ┣ 📂components
     ┃ ┃ ┗ 📜QnAContainer.tsx
     ┃ ┗ 📜page.tsx
     ┣ 📂ranking
     ┃ ┣ 📂components
     ┃ ┃ ┗ 📜RankingList.tsx
     ┃ ┗ 📜page.tsx
     ┣ 📂today-word
     ┃ ┣ 📂components
     ┃ ┃ ┗ 📜GetSimilarlityContainer.tsx
     ┃ ┗ 📜page.tsx
     ┣ 📜APP_URL.ts
     ┣ 📜favicon.ico
     ┣ 📜globals.css
     ┣ 📜layout.tsx
     ┣ 📜page.tsx
     ┗ 📜store.ts

    📦pages
     ┗ 📂api
       ┣ 📂auth
       ┃ ┗ 📜[...nextauth].ts
       ┣ 📂get
       ┃ ┣ 📜checkAnswer.ts
       ┃ ┣ 📜count.ts
       ┃ ┣ 📜embedding.ts
       ┃ ┣ 📜ranking.ts
       ┃ ┗ 📜todaySimilar.ts
       ┣ 📂post
       ┃ ┣ 📜answer.ts
       ┃ ┣ 📜tryCount.ts
       ┃ ┣ 📜updateUserdata.ts
       ┃ ┣ 📜userBadge.ts
       ┃ ┣ 📜userGussess.ts
       ┃ ┣ 📜userImage.ts
       ┃ ┣ 📜username.ts
       ┃ ┣ 📜userPlayTime.ts
       ┃ ┗ 📜winstate.ts
       ┗ 📂word
         ┣ 📜answer.ts
         ┣ 📜frequency.ts
         ┗ 📜similar.ts

     📦util
     ┣ 📂functions
     ┃ ┣ 📜copyToClipboard.ts
     ┃ ┣ 📜detectSimilarWords.ts
     ┃ ┣ 📜fetchMainContentData.ts
     ┃ ┣ 📜fetchNewBadgeStatus.ts
     ┃ ┣ 📜getEmbedding.ts
     ┃ ┣ 📜getOneTenAndK.ts
     ┃ ┣ 📜getServerUserData.ts
     ┃ ┣ 📜handleMultipleConditionsBadge.ts
     ┃ ┣ 📜insertAnswer.ts
     ┃ ┣ 📜isValidKoreanCombination.ts
     ┃ ┗ 📜rankSimilarity.ts
     ┣ 📂hooks
     ┃ ┣ 📜useAppendTodayAnswer.tsx
     ┃ ┣ 📜useGetClipBoardText.tsx
     ┃ ┣ 📜useGetPlaytime.tsx
     ┃ ┣ 📜useHandleLocalstorage.tsx
     ┃ ┣ 📜useQueryAnswerChecker.tsx
     ┃ ┣ 📜useSetModeCookie.tsx
     ┃ ┗ 📜useUpdateLocalStorageByData.tsx
     ┣ 📂provider
     ┃ ┗ 📜ReactQueryProvider.tsx
     ┗ 📜database.ts
