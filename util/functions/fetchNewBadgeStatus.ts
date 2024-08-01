import axios from "axios";
import { UserDataType } from "./getServerUserData";

/** db badge의 상태 변경하는 함수
 * 
 * 첫번째 인자 : nowUserData  / type (UserData| undefined)
 * 
 * 두번째 인자 : 변경할 뱃지의 인덱스 넘버
 * 
 * 0 : 기본 꼬들꼬들
 * 1 : 별 꼬들꼬들
 * 2 : 유령 꼬들꼬들
 * 3 : 악동 꼬들꼬들
 * 4 : 악마 꼬들꼬들 
 */
export default async function fetchNewBadgeStatus(nowUserData: UserDataType | undefined, badgeNumber: number) {
    if (badgeNumber < 0 || badgeNumber > 4) {
        throw new Error('허가되지 않은 번호입니다.');
    }

    if (nowUserData === undefined) {
        throw new Error('사용자 데이터 인식에 실패했습니다');
    }

    // badge가 정의되어 있는지 확인
    if (nowUserData.badge !== undefined) {
        const userEmail = nowUserData.email;
        let newUserBadge = [...nowUserData.badge];
        // 기존 뱃지 상태가 false 일때 (보유중이 아닐때) 만 실행
        if (!newUserBadge[badgeNumber]) {
            try {
                const response = await axios.post('/api/post/userBadge', {
                    email: userEmail,
                    // 바꿀 뱃지의 데이터
                    badgeArr: [true, badgeNumber],
                });

                // API 응답을 확인하여 성공 메시지 표시
                if (response.status === 200) {
                    switch (badgeNumber) {
                        case 0:
                            alert('꼬들꼬들 뱃지를 획득했어요!');
                            break;
                        case 1:
                            alert('별 꼬들꼬들 뱃지를 획득했어요!');
                            break;
                        case 2:
                            alert('유령 꼬들꼬들 뱃지를 획득했어요!');
                            break;
                        case 3:
                            alert('악동 꼬들꼬들 뱃지를 획득했어요!');
                            break;
                        case 4:
                            alert('악마 꼬들꼬들 뱃지를 획득했어요!');
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log('배지 업데이트 실패: ', response.statusText);
                }
            } catch (error) {
                console.log('db 업데이트 중 예상치 못한 에러가 발생했습니다. : ', error);
            }
        }
    }
}