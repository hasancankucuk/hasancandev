import Link from "next/link";
import Image from "next/image";
export default function Header() {
    return (
        <div className="uk-navbar-container">
            <div className="uk-position-top">
                <nav className="uk-container ">
                    <div className="uk-navbar uk-margin">
                        <div className="uk-position-top-center">
                            <Image className="uk-margin-top " width={40} height={40} src="/logo.svg" alt="logo" />
                        </div>
                        <div className="uk-navbar-right">
                            <ul className="uk-navbar-nav ">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/portfolio">Portfolio</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <h1 className="uk-h1 uk-heading-line uk-background-default"><span></span></h1>
        </div>
    )
}