import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import { getLectures } from '../../../redux/actions/Lecture Actions';
import LectureCard from '../../components/LectureCard';

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
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        let createLectureBtn = null;
        if (this.props.user.role === 'Instructor')
            createLectureBtn = (
                <Link
                    to="/dashboard/course/lectures/create"
                    className="elbtn__type1 mt-3">
                    <i className="fas fa-plus-circle" />
                    &nbsp;&nbsp;Add Lectures
                </Link>
            );

        if (isEmpty(this.props.lectures.activeLecture))
            return (
                <Fragment>
                    <div className="lecture">
                        <h1 className="pt-1 mb-3">No Lectures yet...</h1>
                    </div>
                    {createLectureBtn}
                </Fragment>
            );

        let {
            name,
            sno,
            linkID,
            date,
            description,
            resources,
        } = this.props.lectures.activeLecture;

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        let lectureList = this.props.lectures.list.map((lecture, index) => (
            <LectureCard
                name={lecture.name}
                linkID={lecture.linkID}
                date={lecture.date}
                index={index}
                key={index}
            />
        ));

        let resourceList = resources.map((resource, index) => (
            <Link to={resource} key={index} className="lecture-left__resource">
                Resource {index + 1}
            </Link>
        ));

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
                        <h1 className="lecture-left__text--lect">
                            Lecture-{sno + 1}: {name}
                        </h1>
                        <div className="lecture-left__text--date">
                            Created on: {formatted}
                        </div>
                        <p className="lecture-left__text--desc">
                            {description}
                        </p>
                    </div>
                    <div className="lecture-left__resourceList">
                        {resourceList}
                    </div>
                </div>
                <hr className="lecture__rule" />
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
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getLectures },
)(withRouter(Lecture));
