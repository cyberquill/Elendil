import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';

class Course extends Component {
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

        const {
            title,
            about,
            logo,
            cover,
            price,
            date,
            nLectures,
            nStudents,
            nQuestions,
            suggestions,
        } = this.props.activeCourse;

        if (isEmpty(this.props.suggestions))
            suggestions.push('No suggestions yet...');

        const SuggestionList = suggestions.map((sg, index) => (
            <div className="course__suggestion" key={index}>
                {sg}
            </div>
        ));

        return (
            <div className="course">
                <img className="course__cover" src={cover} alt="Course Cover" />
                <img className="course__logo" src={logo} alt="Course Logo" />

                <div className="course__title">{title}</div>
                <div className="course__about">{about}</div>

                <div className="course__info-group">
                    <div className="course__info">
                        Date Created:&emsp;{date}
                    </div>
                    <div className="course__info">
                        No. of Lectures: {nLectures}
                    </div>
                    <div className="course__info">
                        No. of Students: {nStudents}
                    </div>
                    <div className="course__info">
                        No. of Questions: {nQuestions}
                    </div>
                </div>

                <div className="course__btn-group">
                    <Link to="#" className="course__btn">
                        Price: ${price}
                    </Link>
                    <Link
                        to="/dashboard/course/lectures"
                        className="course__btn">
                        View Lectures
                    </Link>
                    <Link
                        to="/dashboard/course/discussion"
                        className="course__btn">
                        Q&A Section
                    </Link>
                </div>
                <section className="suggestion-list">
                    <div className="suggestion__heading">Suggestions :</div>
                    {SuggestionList}
                </section>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    null,
)(withRouter(Course));
