import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../FormGroup';
import { createCourse } from '../../../redux/actions/Course Actions';

class CoursePopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: '',
            title: '',
            about: '',
            logo: '',
            cover: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.coursePopupClose = this.coursePopupClose.bind(this);
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
    onSubmit = e => {
        e.preventDefault();
        const { errors, ...newCourse } = this.state;
        console.log(newCourse);
        this.props.createCourse(newCourse, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    coursePopupClose = e => {
        const popup = document.getElementById('coursePop');
        const btn = document.getElementById('coursePop--btn');
        if (e.target !== popup && e.target !== btn) return;
        popup.firstChild.classList.remove('coursePop__content--active');
        setTimeout(() => {
            popup.classList.remove('coursePop--active');
        }, 400);
    }
    //==========================================================================
    render() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { price, title, about, logo, cover, errors } = this.state;
        return (
            <div
                className="coursePop"
                id="coursePop"
                onClick={this.coursePopupClose}>
                <div className="coursePop__content">
                    <div className="coursePop__card">
                        <form
                            noValidate
                            className="coursePop__card__form"
                            onSubmit={this.onSubmit}>
                            <FormGroup
                                name="title"
                                type="text"
                                thumb="fas fa-book-open"
                                placeholder="Title"
                                value={title}
                                onChange={this.onChange}
                                error={errors.title}
                            />

                            <FormGroup
                                name="about"
                                type="text"
                                thumb="fas fa-info-circle"
                                placeholder="About"
                                value={about}
                                onChange={this.onChange}
                                error={errors.about}
                            />

                            <FormGroup
                                name="price"
                                type="text"
                                thumb="fas fa-rupee-sign"
                                placeholder="Price"
                                value={price}
                                onChange={this.onChange}
                                error={errors.price}
                            />

                            <FormGroup
                                name="logo"
                                type="text"
                                thumb="fas fa-bowling-ball"
                                placeholder="Logo Image"
                                value={logo}
                                onChange={this.onChange}
                                error={errors.logo}
                            />

                            <FormGroup
                                name="cover"
                                type="text"
                                thumb="fas fa-image"
                                placeholder="Cover Image"
                                value={cover}
                                onChange={this.onChange}
                                error={errors.cover}
                            />

                            <input type="hidden" name="_gotcha" />

                            <input
                                type="submit"
                                value="Create Course"
                                id="coursePop--btn"
                                className="elbtn__type2 mt-5"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    course: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createCourse },
)(withRouter(CoursePopup));
