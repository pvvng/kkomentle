'use client'

export default function LoadingSpinner({darkmode} : {darkmode : {[key :string] :string}}){

    console.log(darkmode)

    return(
        <>
            <div className="mt-3" style={{margin : 'auto'}}>
                <div 
                    className="lava-lamp" 
                    style={{ background : darkmode.value === 'dark' ? '#111111' : 'white'}}
                >
                    <div className="bubble"></div>
                    <div className="bubble1"></div>
                    <div className="bubble2"></div>
                    <div className="bubble3"></div>
                </div>
            </div>
            <p 
                className="text-center mt-3"
                style={{ color : darkmode.value === 'dark' ? 'white' : 'dark' }}
            >로딩 중 입니다.</p>
        </>
    )
}