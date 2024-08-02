import { useNowMode } from "@/app/store";
import { useRouter } from "next/navigation";

export default function RefreshBtnContainer(){
    
    const router = useRouter();
    const { nowMode } = useNowMode();

    return(
        <button 
            className={
                nowMode.mode === 'dark'? 
                "float-end refresh-btn border-1 rounded-1 pt-1 pb-1 dark-mode-input-and-btn":
                "float-end refresh-btn border-1 rounded-1 pt-1 pb-1"
            }
            aria-label="refresh"
            onClick={() => {router.refresh()}}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg>
        </button>
    )
}