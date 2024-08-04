'use client';

import { useRouter } from "next/navigation";

export default function MoveToMainPageImage(){

    const router = useRouter();

    return(
        <div className="col-6 text-start" aria-label="go-Main-page" 
            onClick={() => {
                router.push('/');
                router.refresh();
            }}
        >
            <img 
                src='/꼬들꼬들마스코트.png' 
                alt="꼬들꼬들" 
                width="64" 
            />
        </div>
    )
}