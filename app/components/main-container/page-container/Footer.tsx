import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faRankingStar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function FooterContainer(){

    return(
        <>
            <div className="row w-100" style={{margin : 'auto', justifyContent : 'center', alignItems : 'center'}}>
                <div className="col-4 text-center">
                    <Link href="/QnA">
                        <FontAwesomeIcon icon={faQuestion} className="footer-icons" />
                    </Link>
                </div>
                <div className="col-4 text-center">
                    <Link href="/ranking">
                        <FontAwesomeIcon icon={faRankingStar} className="footer-icons" />
                    </Link>
                </div>
                <div className="col-4 text-center">
                    <Link href="/my-page">
                        <FontAwesomeIcon icon={faUser} className="footer-icons" />
                    </Link>
                </div>
            </div>
        </>
    )
}