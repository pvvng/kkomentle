import "./badge.css";

export function DefaultBadge(){
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background: '#eee'}}>
            <img className="hologram-badge" src="/badge-image/기본꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
        </div>
    )
}

export function StarBadge(){
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%', background: '#eee'}}>
            <img className="hologram-badge" src="/badge-image/별꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
        </div>
    )
}

export function GhostBadge(){
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%'}}>
            <div className="holographic-overlay"></div>
            <img className="hologram-badge" src="/badge-image/유령꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
        </div>
    )
}

export function BadBoyBadge(){
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%'}}>
            <img className="hologram-badge" src="/badge-image/악동꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            <div className="holographic-overlay"></div>
            <div className="light-streak"></div>
        </div>
    )
}

export function KingBadge(){
    return(
        <div className="w-100" style={{position : 'relative', overflow : 'hidden', borderRadius: '50%'}}>
            <img className="hologram-badge" src="/badge-image/악마꼬들꼬들.png" width = '100%' height="auto" alt="badge" />
            <div className="holographic-overlay"></div>
            <div className="light-streak"></div>
        </div>
    )
}