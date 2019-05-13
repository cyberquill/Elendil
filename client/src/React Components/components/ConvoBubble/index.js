import React from 'react';

export default function ConvoBubble(props) {
    let type = 'passive';

    if (props.name === props.owner) type = 'active';

    return (
        <div className={`convoBubble__${type}`}>
            <img
                src={props.profilePic}
                alt="Profile Pic"
                className={`convoBubble__${type}--pic`}
            />
            <div className={`convoBubble__${type}__box`}>
                <div className={`convoBubble__${type}--name`}>{props.name}</div>
                <div className={`convoBubble__${type}--date`}>{props.date}</div>
                <div className={`convoBubble__${type}--text`}>{props.text}</div>
            </div>
        </div>
    );
}
