# 단어 유사도 추측 게임 꼬들꼬들 README 

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
[2024.08.04 이전 변동사항 확인](https://github.com/pvvng/kkomentle/blob/develop/README.md)
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
     ┃ ┣ 📂auth
     ┃ ┃ ┗ 📜[...nextauth].ts
     ┃ ┣ 📂get
     ┃ ┃ ┣ 📜checkAnswer.ts
     ┃ ┃ ┣ 📜count.ts
     ┃ ┃ ┣ 📜embedding.ts
     ┃ ┃ ┣ 📜ranking.ts
     ┃ ┃ ┗ 📜todaySimilar.ts
     ┃ ┣ 📂post
     ┃ ┃ ┣ 📜answer.ts
     ┃ ┃ ┣ 📜tryCount.ts
     ┃ ┃ ┣ 📜updateUserdata.ts
     ┃ ┃ ┣ 📜userBadge.ts
     ┃ ┃ ┣ 📜userGussess.ts
     ┃ ┃ ┣ 📜userImage.ts
     ┃ ┃ ┣ 📜username.ts
     ┃ ┃ ┣ 📜userPlayTime.ts
     ┃ ┃ ┗ 📜winstate.ts
     ┃ ┗ 📂word
     ┃ ┃ ┣ 📜answer.ts
     ┃ ┃ ┣ 📜frequency.ts
     ┃ ┃ ┗ 📜similar.ts

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
