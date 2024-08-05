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
- - - 
### 4-1. 메인페이지
- - -
### 4-2. 랭킹페이지
- - -
### 4-3. 마이페이지
- - -
### 4-4. 질문과 답변 페이지
- - - 
### 4-5. 정답 유사어 1000 페이지
- - - 
## 5. 프로젝트 회고

- ### 5-1. 프로젝트 중 신경 쓴 부분
- ### 5-2. 프로젝트 중 어려웠던 부분 && 프로젝트의 아쉬운 부분

## 6. 후기
### 느낀 점

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
