import "./badge.css";

export const GHOST_LINEAR_COLOR = 'linear-gradient(25deg, rgba(96,96,96,1) 0%, rgba(147,147,176,1) 49%, rgba(185,185,255,1) 100%)'
export const BAD_BOY_LINEAR_COLOR = `linear-gradient(25deg, rgba(33,110,255,1) 0%, rgba(41,235,184,1) 49%, rgba(0,212,255,1) 100%)`
export const KING_LINEAR_COLOR = 'radial-gradient(circle, rgba(50,39,255,1) 0%, rgba(95,95,255,1) 34%, rgba(178,178,255,1) 100%)';

interface PropsType {
    userBadgeStatus: boolean;
}

export function DefaultBadge(){
    
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background: '#eee'}}>
            <img className="hologram-badge" src="/badge-image/기본꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
        </div>
    )
}

export function StarBadge({userBadgeStatus} :PropsType){

    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background: '#eee'}}>
            {
                userBadgeStatus?
                <img className="hologram-badge" src="/badge-image/별꼬들꼬들.png" width = '100%' height="auto" alt="badge" />:
                <img className="hologram-badge" src="/badge-image/히든별꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            }
        </div>
    )
}

export function GhostBadge({userBadgeStatus} :PropsType){

    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background : GHOST_LINEAR_COLOR}}>
            {
                userBadgeStatus?
                <img className="hologram-badge" src="/badge-image/유령꼬들꼬들.png" width = '100%' height="auto" alt="badge" />:
                <img className="hologram-badge" src="/badge-image/히든유령꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            }
            <div className="holographic-overlay"></div>
            {/* <div className="light-streak"></div> */}
        </div>
    )
}

export function BadBoyBadge({userBadgeStatus} :PropsType){

    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background : BAD_BOY_LINEAR_COLOR}}>
            {
                userBadgeStatus?
                <img className="hologram-badge" src="/badge-image/악동꼬들꼬들.png" width = '100%' height="auto" alt="badge" />:
                <img className="hologram-badge" src="/badge-image/히든악동꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            }
            <div className="holographic-overlay"></div>
            <div className="light-streak"></div>
        </div>
    )
}

export function KingBadge({userBadgeStatus} :PropsType){

    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background : KING_LINEAR_COLOR}}>
            {
                userBadgeStatus?
                <img className="hologram-badge" src="/badge-image/악마꼬들꼬들.png" width = '100%' height="auto" alt="badge" />:
                <img className="hologram-badge" src="/badge-image/히든악마꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            }
            <div className="holographic-overlay"></div>
            <div className="light-streak"></div>
        </div>
    )
}