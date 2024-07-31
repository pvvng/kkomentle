import { BadBoyBadge, DefaultBadge, GhostBadge, KingBadge, StarBadge } from "./badge-components";

/** 뱃지 이미지 획득하는 함수
 * 
 * 인자 image '꼬들꼬들 타입'
 */
export function getImage(image :string|undefined){

    switch(image){
        case undefined:
            return <DefaultBadge />;
        case '꼬들꼬들':
            return <DefaultBadge />;
        case '별 꼬들꼬들':
            return <StarBadge userBadgeStatus={true} />;
        case '유령 꼬들꼬들':
            return <GhostBadge userBadgeStatus={true} />;
        case '악동 꼬들꼬들':
            return <BadBoyBadge userBadgeStatus={true} />;
        case '악마 꼬들꼬들':
            return <KingBadge userBadgeStatus={true} />;
        default:
            return <DefaultBadge />;
    }
}