[0.1 버전](https://kkodle-kkodle.netlify.app/)

### 개선사항

> 해결한 문제는 *기울여서* 표시

#### *1. input 검열 조건 조금 더 빡빡하게, 영어 안되게, 한글 초성, 숫자 거르기*
  - isValidKoreanCombination 함수 추가해서 숫자, 영어, 초성 거르게 함.

#### 2. 왠지 모르겠는데 배포 이후에 Network 속도가 느려짐. 원인 찾아서 해결하기
  - *유사도 순위를 정답과 비교할 때, db에 저장된 유사도 순위를 찾고 => 없으면 직접 유사도 산출하기 방식으로 하는데 첫번째 과정이 1.3초가량 걸리고 두번째 과정이 0.5초 가량 걸린다.*
    - React Query를 사용해서 db에 저장된 유사도 순위를 불러오는 함수 (rankSimilarlity)의 값을 캐싱함. 이후 속도가 확연히 개선되었음.
  - 쿠키에 저장한 darkmode 데이터를 불러올 때 시간이 1초 가량 걸린다.
  
#### 3. 사용자의 순위 저장해서 데이터 입수하기

#### *4. 포기한 후 정답을 다시 입력하면 포기 => 정답맞힘 으로 상태가 변경되는 오류가 있다.*
  - useHandleLocalstorage 훅에서 현재 정답 상태와 관계 없이 정답이 입력되면 상태를 정답으로 변경했기 때문에 발생한 문제였다.
  - 현재 상태가 포기라면 상태 변경을 막는 방식으로 변경하니 오류가 해결되었다.
  
#### *5. 새로 고침시 포기한 부분의 인덱스 넘버가 잘못 표기되는 오류가 있다.*
   - 포기 버튼을 눌렀을 때, 정답 객체가 localstorage에 추가되지 않아서, 포기한 이후에 정답을 입력하면 늦게 입력한 정답의 index가 적용되기 때문이었다.
   - 포기 버튼을 누르면 정답 객체를 localstorage에 추가하도록 코드를 추가하여 오류를 해결하였다.

#### *6. 정답을 한번만에 맞춰버리면 playtime이 현재시간으로 설정되는 오류가 있다.*
   - starttime이 정의되지 않아서 생긴 문제이다. starttime이 undfiend일 경우 기본값인 0이 되도록 설정했는데, endtime(시작시간)-starttime(0)을 해버리니 playtime이 시작시간이 되었다.
   - starttime의 기본값을 endtime과 동일하게 설정하여 오류를 해결하였다.
