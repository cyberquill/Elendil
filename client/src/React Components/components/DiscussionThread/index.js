import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import { selectQuestion } from '../../../redux/actions/Question Actions';

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
    delPopupHandler() {
        const popup = document.getElementById('discPop');
        popup.firstChild.classList.add('discPop__content--active');
        popup.classList.add('discPop--active');
    }
    //==========================================================================
    render() {
        const { text, date, nAnswers, user, id } = this.props;

        let deleteBtn = null;
        if (name === this.props.user.name && aid !== '-1') {
            deleteBtn = (
                <Fragment>
                    <button
                        className={`discThread__delete`}
                        onClick={this.delPopupHandler}>
                        &times;
                    </button>
                    <DeletePopup del={this.deleteHandler.bind(this, aid)} />
                </Fragment>
            );
        }

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const cls =
            id === this.props.questions.activeQuestion._id
                ? 'discThread--active'
                : '';

        return (
            <Link
                to="/dashboard/course/discussions/"
                className={`discThread ${cls}`}
                onClick={this.questionHandler}>
                <img
                    src={user.profilePic}
                    alt="Profile Pic"
                    className="discThread__pic"
                />
                <div className="discThread__info">
                    <div className="discThread__info__number">{nAnswers}</div>
                    {deleteBtn}
                    <div className="discThread__info__name">{user.name}</div>
                    <div className="discThread__info__text">{text}</div>
                </div>
            </Link>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    questions: state.questions,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectQuestion },
)(withRouter(DiscussionThread));
