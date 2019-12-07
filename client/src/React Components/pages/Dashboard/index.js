import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import CourseCard from '../../components/CourseCard';
import CoursePopup from '../../components/CoursePopup';
import {
    getCourses,
    getSuggestedCourses,
} from '../../../redux/actions/Course Actions';

class Dashboard extends Component {
    //==========================================================================
    componentDidMount() {
        this.props.getCourses(this.props.user.id);
        if (isEmpty(this.props.courses.suggested)) this.props.getSuggestedCourses(this.props.user.id);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });

        if (isEmpty(this.props.courses.suggested))
            this.props.getSuggestedCourses(this.props.user.id);
    }
    //==========================================================================
    coursePopupHandler = e => {
        e.preventDefault();
        const popup = document.getElementById('coursePop');
        popup.firstChild.classList.add('coursePop__content--active');
        popup.classList.add('coursePop--active');
    };
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
                        inst={course.instructor}
                        price={course.price}
                        cid={course._id}
                        iid={course.iid}
                        index={index}
                        key={index}
                        area="suggested"
                    />
                ),
            );

        if (!isEmpty(this.props.courses))
            ListCards = this.props.courses.list.map((course, index) => (
                <CourseCard
                    image={course.logo}
                    title={course.title}
                    inst={course.instructor}
                    price={course.price}
                    cid={course._id}
                    iid={course.iid}
                    index={index}
                    key={index}
                    area="list"
                />
            ));

        let createCourseBtn = null;
        if (this.props.user.role === 'Instructor')
            createCourseBtn = (
                <Fragment>
                    <Link
                        to="#coursePop"
                        className="elbtn__type1"
                        onClick={this.coursePopupHandler.bind(this)}>
                        <i className="fas fa-plus-circle" />
                        &nbsp;&nbsp;Create Course
                    </Link>
                    <CoursePopup />
                </Fragment>
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
