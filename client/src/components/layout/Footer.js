import React from 'react';

export default function Footer() {
    return (
        <div className="footer">
            <a
                className="footer__link"
                href="https://github.com/Brijgopal"
                target="_blank"
                rel="noopener noreferrer">
                Made with
                <span role="img" aria-label="love" aria-labelledby="github-link">
                    💖
                </span>
                by Brijgopal Bharadwaj
            </a>
        </div>
    );
}
