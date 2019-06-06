import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {
    selectQuestion,
    deleteQuestion,
} from '../../../redux/actions/Question Actions';
import { triggerDeletion } from '../../../redux/actions/Delete Actions';

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

        if (
            !prevProps.deletion.approval &&
            this.props.deletion.approval &&
            this.props.deletion.id === this.props.qid
        )
            this.props.deleteQuestion(this.props.qid);
    }
    //==========================================================================
    questionHandler = e => {
        e.preventDefault();
        if (this.props.id !== this.props.questions.activeQuestion._id)
            this.props.selectQuestion(this.props.index);
    };
    //==========================================================================
    render() {
        const { text, date, nAnswers, Quser, qid } = this.props;

        let deleteBtn = null;
        if (Quser.name === this.props.user.name) {
            deleteBtn = (
                <button
                    className={`discThread__delete`}
                    onClick={this.props.triggerDeletion.bind(this, qid)}>
                    <i class="fas fa-times-circle" />
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
                    <div className="discThread__info__text">{text} Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis harum commodi veniam error suscipit laboriosam explicabo, eveniet voluptatum ullam impedit obcaecati, accusantium minus vel quae vero ducimus nostrum unde quis earum consequuntur fugiat provident, esse molestiae labore. Cupiditate quidem, quia aliquam obcaecati aliquid voluptatum, voluptatibus laudantium, amet dignissimos delectus adipisci!</div>
                </div>
            </Link>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    questions: state.questions,
    deletion: state.deletion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectQuestion, deleteQuestion, triggerDeletion },
)(withRouter(DiscussionThread));
