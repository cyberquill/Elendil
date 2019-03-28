import React from 'react';

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">Promethium</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">SignUp</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/posts">Posts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
