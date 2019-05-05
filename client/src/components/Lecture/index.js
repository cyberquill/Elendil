import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';
import { getLectures } from '../../redux/actions/Lecture Actions';
import LectureCard from './LectureCard';

class Lecture extends Component {
    //==========================================================================
    componentDidMount() {
        this.props.getLectures(this.props.activeCourse._id);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });

        /* 
        if (isEmpty(this.props.questions))
            this.props.history.push('/dashboard/course'); */
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        let {
            name,
            sno,
            linkID,
            date,
            description,
            resources,
        } = this.props.lectures.activeLecture;

        let createLectureBtn = null;
        if (this.props.user.role === 'Instructor')
            createLectureBtn = (
                <Link
                    to="/dashboard/course/lectures/create"
                    className="lecture-right__btn">
                    Add Lectures
                </Link>
            );

        let lectureList = this.props.lectures.list.map((lecture, index) => (
            <LectureCard
                name={lecture.name}
                index={index}
                linkID={lecture.linkID}
                date={lecture.date}
                key={index}
            />
        ));

        if (isEmpty(this.props.lectures.activeLecture))
            return (
                <React.Fragment>
                    <div className="lecture">
                        <h1 className="pt-1 mb-3">No Lectures yet...</h1>
                    </div>
                    {createLectureBtn}
                </React.Fragment>
            );

        return (
            <div className="lecture">
                <div className="lecture-left">
                    <div className="lecture-left__ytLink">
                        <iframe
                            className="lecture-left__ytLink-video"
                            src={`https://www.youtube.com/embed/${linkID}`}
                            frameBorder="0"
                            title={name}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="lecture-left__text">
                        <h1 className="lecture-left__text-lect">
                            Lecture {sno + 1}: {name}
                        </h1>
                        <p className="lecture-left__text-desc">{description}</p>
                    </div>
                </div>
                <div className="lecture-right">
                    {createLectureBtn}
                    <div className="lecture-right__lecList">{lectureList}</div>
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
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getLectures },
)(withRouter(Lecture));
