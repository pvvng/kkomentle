import Link from "next/link";
import { faQuestion, faRankingStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FooterContainer(){
    return(
        <div className="row w-100" style={{margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
            <Link href="/qna" className="col-4 text-center mt-3 mb-3" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faQuestion} style={{width : 24,}} />
            </Link>
            <Link href="/ranking" className="col-4 text-center mt-3 mb-3" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faRankingStar} style={{width : 24}} />
            </Link>
            <Link href="/my-page" className="col-4 text-center mt-3 mb-3" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faUser} style={{width : 24}} />
            </Link>
        </div>
    )
}