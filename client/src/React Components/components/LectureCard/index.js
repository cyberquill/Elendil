import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {
    selectLecture,
    deleteLecture,
} from '../../../redux/actions/Lecture Actions';
import { triggerDeletion } from '../../../redux/actions/Delete Actions';

class LectureCard extends Component {
    //==========================================================================
    constructor(props) {
        super(props);
        this.lectureHandler = this.lectureHandler.bind(this);
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
            this.props.deletion.id === this.props.lid
        )
            this.props.deleteLecture(this.props.lid);
    }
    //==========================================================================
    lectureHandler = e => {
        e.preventDefault();
        this.props.selectLecture(this.props.index);
    };
    //==========================================================================
    render() {
        const { name, linkID, date, lid } = this.props;

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        let deleteBtn = null;
        if (this.props.activeCourse.iid === this.props.user.id) {
            deleteBtn = (
                <button
                    className={`lcard__delete`}
                    onClick={this.props.triggerDeletion.bind(this, lid)}>
                    <i class="fas fa-times-circle" />
                </button>
            );
        }

        return (
            <Link
                to="/dashboard/course/lectures"
                className="lcard"
                onClick={this.lectureHandler}>
                <img
                    src={`https://img.youtube.com/vi/${linkID}/maxresdefault.jpg`}
                    alt="Lecture Thumb"
                    className="lcard__thumb"
                />
                <div className="lcard__info">
                    <div className="lcard__info__date">{formatted}</div>
                    {deleteBtn}
                    <div className="lcard__info__name">{name}</div>
                </div>
            </Link>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    lectures: state.lectures,
    activeCourse: state.courses.activeCourse,
    deletion: state.deletion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectLecture, deleteLecture, triggerDeletion },
)(withRouter(LectureCard));
