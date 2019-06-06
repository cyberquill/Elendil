import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import { deleteCourse } from '../../../redux/actions/Course Actions';
import { triggerDeletion } from '../../../redux/actions/Delete Actions';

class Course extends Component {
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
            this.props.deletion.id === this.props.activeCourse._id
        )
            this.props.deleteCourse(this.props.activeCourse._id);
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        window.scrollTo(0, 0);

        const {
            _id,
            title,
            about,
            logo,
            cover,
            price,
            date,
            instructor,
            nLectures,
            nStudents,
            nQuestions,
            suggestions,
        } = this.props.activeCourse;

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        let deleteBtn = null;
        if (this.props.activeCourse.iid === this.props.user.id) {
            deleteBtn = (
                <Link
                    to="#"
                    className="elbtn__type1"
                    onClick={this.props.triggerDeletion.bind(this, _id)}>
                    <i class="fas fa-times-circle" />
                    &nbsp; Delete Course
                </Link>
            );
        }

        if (isEmpty(suggestions)) suggestions.push('No suggestions yet...');

        let addSuggestion = null;
        if (this.props.user.role === 'Student')
            addSuggestion = (
                <Link to="#" className="course__suggestion--btn">
                    Add Suggestions
                </Link>
            );

        const SuggestionList = suggestions.map((sg, index) => (
            <div className="suggestion" key={index}>
                {sg}
            </div>
        ));

        return (
            <div className="course">
                <img className="course__cover" src={cover} alt="Course Cover" />
                <img className="course__logo" src={logo} alt="Course Logo" />

                <div className="course__title">{title}</div>
                <div className="course__about">{about}</div>

                <div className="course__group">
                    <div className="course__info-group">
                        <div className="course__info">
                            No. of Lectures: {nLectures}
                        </div>
                        <div className="course__info">
                            No. of Students: {nStudents}
                        </div>
                        <div className="course__info">
                            No. of Questions: {nQuestions}
                        </div>
                        <div className="course__info">
                            Date Created:&emsp;{formatted}
                        </div>
                    </div>
                    <div className="course__inst-group">
                        <img
                            src={instructor.profilePic}
                            className="course__inst__img"
                            alt="profile Picture"
                        />
                        <div className="course__inst--info">
                            <div className="course__inst__name">
                                {instructor.name}
                            </div>
                            <div className="course__inst__email">
                                {instructor.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="course__btn-group">
                    <Link
                        to="/dashboard/course/payment"
                        className="elbtn__type1">
                        Price: ${price}
                    </Link>
                    <Link
                        to="/dashboard/course/lectures"
                        className="elbtn__type1">
                        View Lectures
                    </Link>
                    <Link
                        to="/dashboard/course/discussion"
                        className="elbtn__type1">
                        Discussion Forum
                    </Link>
                    {deleteBtn}
                </div>

                <section className="suggestion-list">
                    <div className="suggestion__heading">Suggestions :</div>
                    {SuggestionList}
                    {addSuggestion}
                </section>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    activeCourse: state.courses.activeCourse,
    deletion: state.deletion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { deleteCourse, triggerDeletion },
)(withRouter(Course));
