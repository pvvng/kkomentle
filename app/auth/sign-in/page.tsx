import { KakaoSignInBtn } from "@/app/components/main-container/SignBtn";

const BACKGROUND_STYE = {
    // backgroundColor: 'white', 
    // backgroundImage : 'url(/꼬들꼬들마스코트.png)',
    width: '100%', 
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
}

export default function LoginPage() {

    return (
        <div style={{...BACKGROUND_STYE, backgroundSize:'contain', backgroundPosition:'center center', backgroundRepeat:'no-repeat'}}>
            <div className="text-center">
                <img src="/꼬들꼬들마스코트.png" width="250px" height="auto"/>
                <h1 className="fw-bold">꼬들꼬들</h1>
                <p className="fst-italic">오늘의 정답은 뭘까요?</p>
                <KakaoSignInBtn />
            </div>
        </div>
    );
}