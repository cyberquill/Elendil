import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {
    selectQuestion,
    deleteQuestion,
} from '../../../redux/actions/Question Actions';

class DiscussionThread extends Component {
    //==========================================================================
    constructor(props) {
        super(props);
        this.questionHandler = this.questionHandler.bind(this);
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
    questionHandler = e => {
        e.preventDefault();
        if (this.props.id !== this.props.questions.activeQuestion._id)
            this.props.selectQuestion(this.props.index);
    };
    //==========================================================================
    deleteHandler = (qid, e) => {
        this.props.deleteQuestion(qid);
    };
    //==========================================================================
    render() {
        const { text, date, nAnswers, Quser, qid } = this.props;

        let deleteBtn = null;
        if (Quser.name === this.props.user.name) {
            deleteBtn = (
                <button
                    className={`discThread__delete`}
                    onClick={null}>
                    &times;
                </button>
            );
        }

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const cls =
            qid === this.props.questions.activeQuestion._id
                ? 'discThread--active'
                : '';

        return (
            <Link
                to="/dashboard/course/discussions/"
                className={`discThread ${cls}`}
                onClick={this.questionHandler}>
                <img
                    src={Quser.profilePic}
                    alt="Profile Pic"
                    className="discThread__pic"
                />
                <div className="discThread__info">
                    <div className="discThread__info__number">{nAnswers}</div>
                    {deleteBtn}
                    <div className="discThread__info__name">{Quser.name}</div>
                    <div className="discThread__info__text">{text}</div>
                </div>
            </Link>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    questions: state.questions,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectQuestion, deleteQuestion },
)(withRouter(DiscussionThread));
