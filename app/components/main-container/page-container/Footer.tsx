import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faRankingStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function FooterContainer(){
    return(
        <div className="row w-100" style={{margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
            <Link href="/qna" className="col-4 text-center" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faQuestion} className="footer-icons" />
            </Link>
            <Link href="/ranking" className="col-4 text-center" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faRankingStar} className="footer-icons" />
            </Link>
            <Link href="/my-page" className="col-4 text-center" style={{textDecoration : 'none'}}>
                <FontAwesomeIcon icon={faUser} className="footer-icons" />
            </Link>
        </div>
    )
}