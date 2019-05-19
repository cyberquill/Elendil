import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../FormGroup';
import { createLecture } from '../../../redux/actions/Lecture Actions';

class LecturePopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            link: '',
            description: '',
            cid: this.props.activeCourse._id,
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.lecturePopupClose = this.lecturePopupClose.bind(this);
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
        const { errors, ...newLecture } = this.state;
        this.props.createLecture(newLecture, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    lecturePopupClose = e => {
        const popup = document.getElementById('lecturePop');
        const btn = document.getElementById('lecturePop--btn');
        if (e.target !== popup && e.target !== btn) return;
        popup.firstChild.classList.remove('lecturePop__content--active');
        setTimeout(() => {
            popup.classList.remove('lecturePop--active');
        }, 400);
    }
    //==========================================================================
    render() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { name, link, description, errors } = this.state;
        return (
            <div
                className="lecturePop"
                id="lecturePop"
                onClick={this.lecturePopupClose}>
                <div className="lecturePop__content">
                    <div className="lecturePop__card">
                        <form
                            noValidate
                            className="lecturePop__card__form"
                            onSubmit={this.onSubmit}>
                            <FormGroup
                                name="name"
                                type="text"
                                thumb="fas fa-signature"
                                placeholder="Name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                                others=""
                            />

                            <FormGroup
                                name="description"
                                type="text"
                                thumb="fas fa-info-circle"
                                placeholder="Description"
                                value={description}
                                onChange={this.onChange}
                                error={errors.description}
                                others=""
                            />

                            <FormGroup
                                name="link"
                                type="url"
                                thumb="fab fa-youtube"
                                placeholder="Video Link"
                                value={link}
                                onChange={this.onChange}
                                error={errors.link}
                                others=""
                            />

                            <input type="hidden" name="_gotcha" />

                            <input
                                type="submit"
                                value="Create Lecture"
                                id="lecturePop--btn"
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
    activeCourse: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createLecture },
)(withRouter(LecturePopup));
