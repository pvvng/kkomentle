[0.1 버전](https://kkodle-kkodle.netlify.app/)

#### 개선사항
1. input 검열 조건 조금 더 빡빡하게, 영어 안되게, 한글 초성, 숫자 거르기
2. 왠지 모르겠는데 배포 이후에 Network 속도가 느려짐. 원인 찾아서 해결하기
  - 유사도 순위를 정답과 비교할 때, db에 저장된 유사도 순위를 찾고 => 없으면 직접 유사도 산출하기 방식으로 하는데 첫번째 과정이 1.3초가량 걸리고 두번째 과정이 0.5초 가량 걸린다.
3. 사용자의 순위 저장해서 데이터 입수하기
