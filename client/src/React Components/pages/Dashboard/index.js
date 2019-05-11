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
            isEmpty(this.props.courses.suggested)
        )
            this.props.getSuggestedCourses(this.props.user.id);
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.user)) {
            this.props.history.push('/login');
            return null;
        }

        let data_carousel_1 = null;
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
                        price={course.price}
                        index={index}
                        area="suggested"
                        key={index}
                    />
                ),
            );

        if (!isEmpty(this.props.courses))
            data_carousel_1 = this.props.courses.suggested.map(
                (course, index) => {
                    let data = {};
                    data.img = course.cover;
                    data.heading = course.title;
                    data.desc = course.about;
                    return data;
                },
            );

        if (!isEmpty(this.props.courses))
            ListCards = this.props.courses.list.map((course, index) => (
                <CourseCard
                    image={course.logo}
                    title={course.title}
                    about={course.about}
                    price={course.price}
                    index={index}
                    area="list"
                    key={index}
                />
            ));

        let createCourseBtn = null;
        if (this.props.user.role === 'Instructor')
            createCourseBtn = (
                <Link to="/dashboard/course/create" className="dashboard__btn">
                    <i className="fas fa-plus-circle" />
                    &nbsp;&nbsp;Create Course
                </Link>
            );

        return (
            <section className="dashboard">
                <div className="dashboard__heading">Dashboard</div>
                <div className="dashboard__section-head">Your Courses:</div>
                {createCourseBtn}
                <div className="dashboard__list">
                    <div className="courseCard-group">{ListCards}</div>
                </div>
                <div className="dashboard__section-head">Suggested:</div>
                <div className="dashboard__suggested">
                    <div className="courseCard-group">{SuggestedCards}</div>
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
