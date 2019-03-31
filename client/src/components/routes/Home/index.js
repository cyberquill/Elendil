import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

export default function index() {
    return (
        <div className="landing">
            <div className="landing__container">
                <nav>
                    <div className="landing__navbar">
                        <div className="landing__navbar-left-name">
                            SOFTWARE PROJECT <br />
                            <span className="guide">
                                Guided by PROF. Mythili T.
                            </span>
                        </div>
                        <div className="landing__navbar-middle-logo">
                            <img
                                className="logo"
                                src={logo}
                                alt="ELENDIL Logo"
                            />
                        </div>
                        <div className="landing__navbar-right-contact">CONTACT</div>
                    </div>
                </nav>
                <div className="landing__content clearfix">
                    <h1>
                        <span className="sp">Elendil</span> is a great Solution for{' '}
                        <br />
                        imparting Education Online.
                    </h1>
                    <p className="landing__content-para">
                        A Great Platform where Teachers can share their <br />
                        knowledge, and Learners can recieve <br />
                        the same, anytime, anywhere!
                    </p>
                    <div className="landing__buttons">
                        <Link
                            to="/signup"
                            className="landing__buttons-btn btn-white">
                            Sign Up!
                        </Link>
                        <Link
                            to="/login"
                            className="landing__buttons-btn btn-white">
                            Login.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
