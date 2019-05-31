import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import DiscussionThread from '../../components/DiscussionThread';
import DiscussionBar from '../../components/DiscussionBar';
import DiscPopup from '../../components/DiscPopup';
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

        if (this.props.questions.activeQuestion) {
            if (!prevProps.questions.activeQuestion)
                this.props.getAnswers(this.props.questions.activeQuestion._id);
            else if (
                this.props.questions.activeQuestion._id !==
                    prevProps.questions.activeQuestion._id ||
                this.props.questions.list.length !==
                    prevProps.questions.list.length
            )
                this.props.getAnswers(this.props.questions.activeQuestion._id);
        }
    }
    //==========================================================================
    discPopupHandler = e => {
        e.preventDefault();
        const popup = document.getElementById('discPop');
        popup.firstChild.classList.add('discPop__content--active');
        popup.classList.add('discPop--active');
    };
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        let createDiscussionBtn = (
            <Fragment>
                <Link
                    to="#LecturePop"
                    className="elbtn__type1 mt-3"
                    onClick={this.discPopupHandler.bind(this)}>
                    <i className="fas fa-plus-circle" />
                    &nbsp;&nbsp;Start new Discussion
                </Link>
                <DiscPopup />
            </Fragment>
        );

        if (isEmpty(this.props.questions.activeQuestion))
            return (
                <Fragment>
                    <div className="discussion--empty">
                        <div className="discussion--empty__text">
                            No Discussions yet...
                        </div>
                        <div className="discussion--empty__btn">
                            {createDiscussionBtn}
                        </div>
                    </div>
                </Fragment>
            );

        const threadList = this.props.questions.list.map((thread, index) => (
            <DiscussionThread
                text={thread.text}
                date={thread.date}
                nAnswers={thread.nAnswers}
                Quser={thread.user}
                qid={thread._id}
                index={index}
                key={index}
            />
        ));

        const conversation = this.props.answers.list.map((convo, index) => {
            const formatted = new Date(convo.date).toLocaleDateString('en-UK', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            console.log(convo._id);
            
            return (
                <ConvoBubble
                    key={index}
                    date={formatted}
                    name={convo.user.name}
                    profilePic={convo.user.profilePic}
                    text={convo.text}
                    aid={convo._id}
                    owner={this.props.questions.activeQuestion.user.name}
                />
            );
        });

        const { date, user, text, _id } = this.props.questions.activeQuestion;
        const formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        conversation.unshift(
            <ConvoBubble
                date={formatted}
                name={user.name}
                profilePic={user.profilePic}
                text={text}
                aid={"-1"}
                owner={user.name}
            />,
        );

        return (
            <section className="discussion">
                <div className="discussion-threads">
                    {createDiscussionBtn}
                    {threadList}
                </div>
                <div className="discussion-group">
                    {conversation}
                    <DiscussionBar />
                </div>
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
