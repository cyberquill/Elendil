import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className='home--wrapper'>
                <div className='home'>
                    <div className='home__heading'>Elendil</div>
                    <div className='home__btns'>
                        <Link to='/login' className='home__btns--btn'>
                            Login
                        </Link>
                        <Link to='/signup' className='home__btns--btn'>
                            Signup
                        </Link>
                    </div>
                    <div className='home__desc'>Lets explore something new!</div>
                    <div className='home__cube--scene'>
                        <div className='home__cube'>
                            <div className='home__cube__face home__cube__face--frt'>Study</div>
                            <div className='home__cube__face home__cube__face--bck'>Fun</div>
                            <div className='home__cube__face home__cube__face--rht'>Knowledge</div>
                            <div className='home__cube__face home__cube__face--lft'>Enthusiasm</div>
                            <div className='home__cube__face home__cube__face--top'>Learning</div>
                            <div className='home__cube__face home__cube__face--btm'>Application</div>
                        </div>
                    </div>
                    <div class='home__wave'>
                        <div className="home__wave--itm"></div>
                        <div className="home__wave--rect"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;