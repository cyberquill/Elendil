import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import CourseCard from '../../components/CourseCard';
import {
    getCourses,
    getSuggestedCourses,
} from '../../../redux/actions/Course Actions';

class Dashboard extends Component {
    //==========================================================================
    componentDidMount() {
        this.props.getCourses(this.props.user.id);
        this.props.getSuggestedCourses(this.props.user.id);
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
    render() {
        if (isEmpty(this.props.user)) {
            this.props.history.push('/login');
            return null;
        }

        let SuggestedCards,
            ListCards = (
                <div className="dashboard__section--empty">No Courses</div>
            );

        if (!isEmpty(this.props.courses))
            SuggestedCards = this.props.courses.suggested.map(
                (course, index) => (
                    <CourseCard
                        image={course.logo}
                        title={course.title}
                        about={course.about}
                        index={index}
                        area="suggested"
                        key={index}
                    />
                ),
            );

        if (!isEmpty(this.props.courses))
            ListCards = this.props.courses.list.map((course, index) => (
                <CourseCard
                    image={course.logo}
                    title={course.title}
                    about={course.about}
                    index={index}
                    area="list"
                    key={index}
                />
            ));

        let createCourseBtn = null;
        if (this.props.user.role === 'Instructor')
            createCourseBtn = (
                <React.Fragment>
                    <div className="dashboard__btn">
                        <Link
                            to="/dashboard/course/create"
                            className="dashboard__btn--link">
                            Create Course
                        </Link>
                    </div>
                    <div className="cardsheading">Your Courses: </div>
                </React.Fragment>
            );

        return (
            <section className="dashboard">
                <div className="dashboard__header">Instructor Dashboard</div>
                <div className="dashboard__list">
                    <div className="dashboard__section--head">
                        Your Courses:
                    </div>
                    <div className="courseCard-group">
                        {ListCards}
                    </div>
                    {createCourseBtn}
                </div>
                <div className="dashboard__suggested">
                    <div className="dashboard__section--head">
                        Suggested:
                    </div>
                    <div className="courseCard-group pb-5">
                        {SuggestedCards}
                    </div>
                </div>
            </section>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    courses: state.courses,
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCourses, getSuggestedCourses },
)(withRouter(Dashboard));
