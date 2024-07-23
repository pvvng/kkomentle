import { useNowMode, useSettingState } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** 쿠키와 store에 모드 업데이트 하는 커스텀 훅 */
export default function useSetModeCookie(darkmode : {[key :string] :string}){
    const router = useRouter();
    const { setNowMode } = useNowMode();
    const { setSettingState }  = useSettingState();

    useEffect(() => {
        // cookie로 다크모드 여부를 확인하지 못했을 때
        if(darkmode === undefined){
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
            router.refresh();

        }
        if(darkmode !== undefined){
            const cookieMode = darkmode.value;
            setNowMode({ mode: cookieMode });
            if(cookieMode === 'dark'){
                setSettingState({ darkmode : true });
            }else{
                setSettingState({ darkmode : false });
            }
        }
    },[darkmode]);
}