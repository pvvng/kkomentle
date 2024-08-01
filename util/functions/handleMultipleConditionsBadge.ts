import fetchNewBadgeStatus from './fetchNewBadgeStatus'; // 비동기 함수 import
import { UserDataType } from './getServerUserData';

/** fetchNewBadgeStatus 함수의 병렬적 통신 처리를 위한 함수 */
export default async function handleMultipleConditions(nowUserData: UserDataType | undefined, badgeNumber: number) {

    // 로그인 하지 않은 유저일 경우 빈 값 반환
    if(nowUserData === undefined){
        return null;
    }

    const requests = [];

    switch (badgeNumber) {
        case 1 :
            requests.push(fetchNewBadgeStatus(nowUserData, 1));
            break;
        case 2 :
            requests.push(fetchNewBadgeStatus(nowUserData, 2));
            break;
        case 3 :
            requests.push(fetchNewBadgeStatus(nowUserData, 3));
            break;
        case 4 :
            requests.push(fetchNewBadgeStatus(nowUserData, 4));
            break;
        default:
            break;
    }

    // 모든 요청을 병렬로 처리
    try {
        await Promise.all(requests);
        console.log('모든 배지 상태 업데이트 완료');
    } catch (error) {
        console.error('배지 업데이트 중 오류 발생:', error);
    }
}
