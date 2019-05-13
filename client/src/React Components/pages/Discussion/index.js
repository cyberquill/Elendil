import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import DiscussionThread from '../../components/DiscussionThread';
import ConvoBubble from '../../components/ConvoBubble';
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

        const threadList = this.props.questions.list.map((thread, index) => (
            <DiscussionThread
                text={thread.text}
                date={thread.date}
                nAnswers={thread.nAnswers}
                user={thread.user}
                id={thread._id}
                index={index}
                key={index}
            />
        ));

        this.props.answers.list.unshift(this.props.questions.activeQuestion);

        const conversation = this.props.answers.list.map((convo, index) => {
            let formatted = new Date(convo.date).toLocaleDateString('en-UK', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            return (
                <ConvoBubble
                    key={index}
                    date={formatted}
                    name={convo.user.name}
                    profilePic={convo.user.profilePic}
                    text={convo.text}
                    owner={this.props.questions.activeQuestion.user.name}
                />
            );
        });

        return (
            <section className="discussion">
                <div className="discussion-threads">{threadList}</div>
                <div className="discussion-group">{conversation}</div>
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
