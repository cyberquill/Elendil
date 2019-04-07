import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {
    getCourses,
    getAllCourses,
} from '../../../redux/actions/Course Actions';
import DashCard from './DashCard';

class dashboard extends Component {
    //==========================================================================
    componentWillMount() {
        if (isEmpty(this.props.user)) this.props.history.push('/login');

        if (this.props.user.role === 'Instructor') {
            if (isEmpty(this.props.instructor))
                this.props.history.push('/login');
            else this.props.getCourses(this.props.user.id);
        }

        this.props.getAllCourses();
    }
    //==========================================================================
    render() {
        const AllCards = this.props.courses.all.map((course, index) => (
            <DashCard
                image={course.logo}
                title={course.title}
                about={course.about}
                index={index}
                area="all"
                key={index}
            />
        ));

        let createCourseBtn,
            Cards = null;
        if (this.props.user.role === 'Instructor') {
            createCourseBtn = (
                <React.Fragment>
                    <div className="dashboard__btn">
                        <Link
                            to="/dashboard/course/create"
                            className="btn btn-lg btn-primary btn-outline-light">
                            Create Course
                        </Link>
                    </div>
                    <div className="cardsheading">Your Courses: </div>
                </React.Fragment>
            );

            Cards = this.props.courses.list.map((course, index) => (
                <DashCard
                    image={course.logo}
                    title={course.title}
                    about={course.about}
                    index={index}
                    area="list"
                    key={index}
                />
            ));
        }

        return (
            <section className="dashboard">
                <div className="bd-example">
                    <div
                        id="carouselExampleCaptions"
                        className="carousel slide"
                        data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li
                                data-target="#carouselExampleCaptions"
                                data-slide-to="0"
                                className="active"
                            />
                            <li
                                data-target="#carouselExampleCaptions"
                                data-slide-to="1"
                            />
                            <li
                                data-target="#carouselExampleCaptions"
                                data-slide-to="2"
                            />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    className="d-block dashboard__img"
                                    alt="..."
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Excell in what you Love!!!!</h5>
                                    <p>
                                        Nulla vitae elit libero, a pharetra
                                        augue mollis interdum.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://images.unsplash.com/photo-1518463892881-d587bf2c296a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    className="d-block dashboard__img"
                                    alt="..."
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>
                                        Be the best version of yourself !!!!
                                    </h5>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://images.unsplash.com/photo-1548425083-4261538dbca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    className="d-block dashboard__img"
                                    alt="..."
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Honour you elders...</h5>
                                    <p>
                                        Praesent commodo cursus magna, vel
                                        scelerisque nisl consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleCaptions"
                            role="button"
                            data-slide="prev">
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleCaptions"
                            role="button"
                            data-slide="next">
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>

                {createCourseBtn}

                <div className="dashcard-group">{Cards}</div>
                <div className="cardsheading">Featured: </div>
                <div className="dashcard-group pb-5">{AllCards}</div>
            </section>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    courses: state.courses,
    instructor: state.instructor,
    user: state.auth.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCourses, getAllCourses },
)(withRouter(dashboard));
