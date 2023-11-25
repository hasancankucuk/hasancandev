import { useEffect } from "react";

export default function Home() {
    const openResume = () => {
        window.open('https://read.cv/hasancankucuk', '_blank');
    };

    const openContact = () => {
        window.location.href = 'mailto:hasancankucuk@yandex.com';
    };

    return (
        <div className="uk-height-viewport uk-flex uk-flex-center uk-flex-middle">
            <div className="container radius">
                <div className="uk-card uk-card-default uk-card-body radius theme" style={{ left: '5%' }}>
                    <div className="uk-card-header">
                        <h3 className="uk-card-title bold-font theme">Hasan Can Kucuk</h3>
                    </div>
                    <div className="uk-card-body">
                        <p className="marginLeft" style={{ width: '40vh' }}>Passionate front-end developer and software engineer.</p>
                        <div className="info">
                            <p className="marginLeft uk-margin-remove-bottom company" >💻 Mavidev Software and Consulting</p>
                            <p className="marginLeft uk-margin-remove-top previous">Previously: C-Prot</p>
                            <p className="marginLeft uk-margin-small-top location">📍 Currently in Turkey, but my bags are packed and my passport is doing warm-up stretches.</p>
                        </div>
                        <div className="uk-margin-large-top uk-flex uk-flex-center button-container">
                            <button
                                className="uk-button uk-button-primary radius bold resume-button"
                                onClick={() => window.open('https://read.cv/hasancankucuk', '_blank')}
                            >
                                Resume
                            </button>
                            <button
                                className="uk-button uk-button-primary radius bold contact-button "
                                onClick={() => window.location.href = 'mailto:hasancankucuk@yandex.com'}
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}