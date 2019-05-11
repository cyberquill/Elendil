import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';

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

                <div className="course__title">
                    {title} Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Illo, nostrum?
                </div>
                <div className="course__about">
                    {about} Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Dicta accusantium maxime voluptas ad. Unde accusantium
                    neque reiciendis. Veritatis illo tenetur eius voluptate
                    officiis eaque odit repellendus fugit quae quidem esse,
                    voluptatem eveniet excepturi quas in repudiandae, nihil quis
                    optio neque quam maxime nostrum sunt. Commodi ipsam at
                    exercitationem excepturi a.
                </div>

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
                    </div>
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
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    null,
)(withRouter(Course));
