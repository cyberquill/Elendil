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
        this.props.selectQuestion(this.props.index);
    };
    //==========================================================================
    render() {
        const { text, date, nAnswers, user } = this.props;
        return (
            <Link
                to="/dashboard/course/discussions/"
                className="discussionthread"
                onClick={this.questionHandler}>
                <img
                    src={user.profilePic}
                    alt="Profile Pic"
                    className="discussionthread__pic"
                />
                <div className="discussionthread__name">{user.name}</div>
                <div className="discussionthread__date">{date}</div>
                <div className="discussionthread__text">{text}</div>
                <div className="discussionthread__number">{nAnswers}</div>
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
