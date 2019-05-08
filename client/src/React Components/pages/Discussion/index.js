import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import DiscussionThread from '../../components/DiscussionThread';
import {
    getQuestions,
    createQuestion,
} from '../../../redux/actions/Question Actions';
import { getAnswers } from '../../../redux/actions/Answer Actions';

class Discussion extends Component {
    //==========================================================================
    componentDidMount() {
        this.props.getQuestions(this.props.activeCourse._id);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });

        if (
            this.props.questions.activeQuestion._id !==
                prevProps.questions.activeQuestion._id ||
            this.props.questions.list.length !== prevProps.questions.list.length
        )
            this.props.getAnswers(this.props.questions.activeQuestion._id);
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        let createDiscussionBtn = (
            <Link
                to="/dashboard/course/discussions/create"
                className="lecture-right__btn">
                Start new Discussion
            </Link>
        );

        if (isEmpty(this.props.questions.activeQuestion))
            return (
                <Fragment>
                    <div className="lecture">
                        <h1 className="pt-1 mb-3">No Discussions yet...</h1>
                    </div>
                    {createDiscussionBtn}
                </Fragment>
            );

        let answerList = this.props.answers.list.map((answer, index) => (
            <div className="discussion__active__answer" key={index}>
                <img
                    src={answer.user.profilePic}
                    alt="Profile Pic"
                    className="discussion__active__answer--pic"
                />
                <div className="discussion__active__answer--name">
                    {answer.user.name}
                </div>
                <div className="discussion__active__answer--date">
                    {answer.date}
                </div>
                <div className="discussion__active__answer--text">
                    {answer.text}
                </div>
            </div>
        ));

        let threadList = this.props.questions.list.map((thread, index) => (
            <DiscussionThread
                text={thread.text}
                date={thread.date}
                nAnswers={thread.nAnswers}
                user={thread.user}
                index={index}
                key={index}
            />
        ));

        let { text, date, user } = this.props.questions.activeQuestion;

        return (
            <section className="discussion">
                <div className="discussion__active">
                    <div className="discussion__active__main">
                        <img
                            src={user.profilePic}
                            alt="Profile Pic"
                            className="discussion__active__main--pic"
                        />
                        <div className="discussion__active__main--name">
                            {user.name}
                        </div>
                        <div className="discussion__active__main--date">
                            {date}
                        </div>
                        <div className="discussion__active__main--text">
                            {text}
                        </div>
                    </div>
                </div>
                <div className="discussion__active__answer-group">
                    {answerList}
                </div>
                <div className="discussion__threads">{threadList}</div>
            </section>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    questions: state.questions,
    answers: state.answers,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getQuestions, createQuestion, getAnswers },
)(withRouter(Discussion));
