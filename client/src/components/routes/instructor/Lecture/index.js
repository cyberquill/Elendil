import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { getQuestions } from '../../../../redux/actions/Question Actions';
import LectureCard from './LectureCard';

class Lecture extends Component {
    //==========================================================================
    constructor(props) {
        super(props);

        this.questionsHandler = this.questionsHandler.bind(this);
    }
    //==========================================================================
    componentWillMount() {
        if (isEmpty(this.props.activeCourse)) this.props.history.push('/login');
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.errors) && this.props.errors !== 'Unauthorized')
            this.setState({ errors: this.props.errors });

        if (!isEmpty(this.props.activeLecture))
            this.props.history.push('/dashboard/course/lectures');

        if (!isEmpty(this.props.questions))
            this.props.history.push('/dashboard/course/lectures');
    }
    //==========================================================================
    questionsHandler = e => {
        e.preventDefault();
        this.props.getQuestions(this.props.activeCourse._id);
    };
    //==========================================================================
    render() {
        const { name, sno, link, date, description } = this.props.activeLecture;

        const lectureList = this.props.lectures.map((lecture, index) => (
            <LectureCard 
                name={lecture.name}
                sno={lecture.sno}
                link={lecture.link}
                date={lecture.date}
                thumb={lecture.thumb}
                description={lecture.description}
                key={index}
            />
        ));

        return (
            <div className="lecture">
                <div className="lecture-left">
                    <div className="lecture-left__ytLink">
                        <iframe
                            width="840"
                            height="465"
                            src={link}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        />
                    </div>
                    <div className="lecture-left__text">
                        <h1 className="lecture-left__text-lect">
                            Lecture {sno}: {name}
                        </h1>
                        <p className="lecture-left__text-desc">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="lecture-right">
                    <div className="lecture-right__btn">
                        <a href="#" className="lecture-right__btn-link">
                            Add Lectures
                        </a>
                    </div>
                    <div className="lecture-right__lecList">
                        
                    </div>
                </div>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    lectures: state.lectures,
    activeLecture: state.lectures.activeLecture,
    questions: state.questions.list,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getQuestions },
)(withRouter(Lecture));
