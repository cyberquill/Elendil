import React from 'react';
import { Link } from 'react-router-dom';

const dashCard = ({ image, title, about, link }) => {
    return (
        <Link to={link}>
            <div className="card">
                <div className="card-img-parent">
                    <img src={image} className="card-img" alt="" />
                </div>
                <div className="title">
                    <h3>{title}</h3>
                </div>
                <div className="desc">
                    <p>{about}</p>
                </div>
            </div>
        </Link>
    );
};

export default dashCard;
