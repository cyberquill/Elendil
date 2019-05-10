import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { selectCourse } from '../../../redux/actions/Course Actions';
import isEmpty from '../../../validation/isEmpty';

class CourseCarousel extends Component {
    //==========================================================================
    clickHandler = (index, e) => {
        e.preventDefault();
        this.props.selectCourse(index, 'suggested', this.props.history);
    };
    //==========================================================================
    render() {
        const { id, data_arr } = this.props;

        if (isEmpty(data_arr)) return null;

        const slides = data_arr.map((data, index) => {
            const { img, heading, desc } = data;
            const cls = index ? '' : 'active';

            return (
                <Link to="/" onClick={this.clickHandler.bind(this, index)}>
                    <div class={`carousel-item ${cls}`}>
                        <img src={img} class="d-block w-100" alt="Image" />
                        <div class="carousel-caption">
                            <h3>{heading}</h3>
                            <p>{desc}</p>
                        </div>
                    </div>
                </Link>
            );
        });

        const Indicators = data_arr.map((data, index) => (
            <li
                data-target={`#${id}`}
                data-slide-to={`${index}`}
                class={index ? '' : 'active'}
            />
        ));

        return (
            <div
                id={id}
                class="carousel slide carousel-fade"
                data-ride="carousel">
                {/* <!-- Indicators --> */}
                <ol class="carousel-indicators">{Indicators}</ol>

                {/* <!-- Wrapper for slides --> */}
                <div class="carousel-inner">{slides}</div>

                {/* <!-- Left and right controls --> */}
                <a
                    class="carousel-control-prev"
                    href={`#${id}`}
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
                    href={`#${id}`}
                    role="button"
                    data-slide="next">
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    />
                    <span class="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectCourse },
)(withRouter(CourseCarousel));
