import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { getCourses } from '../../../../redux/actions/Course Actions';
import DashCard from './DashCard';

class dashboard extends Component {
    //==========================================================================
    componentWillMount() {
        if (isEmpty(this.props.user) || isEmpty(this.props.instructor))
            this.props.history.push('/login');

        this.props.getCourses(this.props.user.id);
    }
    //==========================================================================
    render() {
        const Cards = this.props.courses.map((course, index) => (
            <DashCard
                image={course.logo}
                title={course.title}
                about={course.about}
                index={index}
                key={index}
            />
        ));

        return (
            <section className="dashboard">
                <div class="bd-example">
                    <div
                        id="carouselExampleCaptions"
                        class="carousel slide"
                        data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li
                                data-target="#carouselExampleCaptions"
                                data-slide-to="0"
                                class="active"
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
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img
                                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    class="d-block dashboard__img"
                                    alt="..."
                                />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Excell in what you Love!!!!</h5>
                                    <p>
                                        Nulla vitae elit libero, a pharetra
                                        augue mollis interdum.
                                    </p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img
                                    src="https://images.unsplash.com/photo-1518463892881-d587bf2c296a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    class="d-block dashboard__img"
                                    alt="..."
                                />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Be the best version of yourself !!!!</h5>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img
                                    src="https://images.unsplash.com/photo-1548425083-4261538dbca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                    class="d-block dashboard__img"
                                    alt="..."
                                />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Honour you elders...</h5>
                                    <p>
                                        Praesent commodo cursus magna, vel
                                        scelerisque nisl consectetur.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a
                            class="carousel-control-prev"
                            href="#carouselExampleCaptions"
                            role="button"
                            data-slide="prev">
                            <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                            />
                            <span class="sr-only">Previous</span>
                        </a>
                        <a
                            class="carousel-control-next"
                            href="#carouselExampleCaptions"
                            role="button"
                            data-slide="next">
                            <span
                                class="carousel-control-next-icon"
                                aria-hidden="true"
                            />
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="dashboard__btn">
                    <Link
                        to="/dashboard/course/create"
                        className="btn btn-lg btn-primary">
                        Create Course
                    </Link>
                </div>
                <div className="cardGroup">{Cards}</div>
            </section>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    courses: state.courses.list,
    instructor: state.instructor,
    user: state.auth.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCourses },
)(withRouter(dashboard));
