import React from 'react';
import Particles from 'react-particles-js';
import SignUpCard from './SignUpCard';

export default function index() {
    return (
        <div className="signup">
            <Particles
                className="particles"
                params={{
                    particles: {
                        number: {
                            value: 200,
                        },
                        color: {
                            value: '#222',
                        },
                        size: {
                            value: 5,
                        },
                        line_linked: {
                            color: '#000',
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 4,
                        },
                    },
                }}
            />
            <SignUpCard />
        </div>
    );
}
