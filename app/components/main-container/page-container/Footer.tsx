import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faRankingStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function FooterContainer(){

    return(
        <>
            <div className="row w-100 mt-5 mb-5" style={{margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
                <div className="col-4 text-center">
                    <Link href="/QnA" aria-label="go-QnA-page">
                        <FontAwesomeIcon icon={faQuestion} className="footer-icons" />
                    </Link>
                </div>
                <div className="col-4 text-center">
                    <Link href="/ranking" aria-label="go-Ranking-page">
                        <FontAwesomeIcon icon={faRankingStar} className="footer-icons" />
                    </Link>
                </div>
                <div className="col-4 text-center">
                    <Link href="/my-page" aria-label="go-My-page">
                        <FontAwesomeIcon icon={faUser} className="footer-icons" />
                    </Link>
                </div>
            </div>
        </>
    )
}