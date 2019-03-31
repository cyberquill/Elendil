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

        if (isEmpty(this.props.lectures.activeLecture))
            this.props.history.push('/dashboard/course');

        if (isEmpty(this.props.questions))
            this.props.history.push('/dashboard/course');
    }
    //==========================================================================
    questionsHandler = e => {
        e.preventDefault();
        this.props.getQuestions(this.props.activeCourse._id);
    };
    //==========================================================================
    render() {
        let {
            name,
            sno,
            linkID,
            date,
            description,
        } = this.props.lectures.activeLecture;

        let lectureList = this.props.lectures.list.map((lecture, index) => (
            <LectureCard
                name={lecture.name}
                index={index}
                linkID={lecture.linkID}
                date={lecture.date}
                key={index}
            />
        ));

        return (
            <div className="lecture">
                <div className="lecture-left">
                    <div className="lecture-left__ytLink">
                        <iframe
                            className="lecture-left__ytLink-video"
                            src={`https://www.youtube.com/embed/${linkID}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="lecture-left__text">
                        <h1 className="lecture-left__text-lect">
                            Lecture {sno}: {name}
                        </h1>
                        <p className="lecture-left__text-desc">{description}</p>
                    </div>
                </div>
                <div className="lecture-right">
                    <Link to="/dashboard/course/lectures/create" className="lecture-right__btn">
                        Add Lectures
                    </Link>
                    <div className="lecture-right__lecList">
                        {lectureList}
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
    questions: state.questions.list,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getQuestions },
)(withRouter(Lecture));
