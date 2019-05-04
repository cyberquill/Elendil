import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../validation/isEmpty';
import { createUser } from '../../redux/actions/User Actions';
import FormGroup from '../layouts/formGroup';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            role: '',
            gender: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        const { errors, ...newUser } = this.state;
        this.props.createUser(newUser, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const { name, email, password, password2, errors } = this.state;
        return (
            <div className="signup">
                <div className="signup__heading">Signup to Continue!</div>
                <div className="signup__card">
                    <form
                        noValidate
                        className="signup__card__form"
                        onSubmit={this.onSubmit}>
                        <FormGroup
                            name="name"
                            type="text"
                            thumb="fas fa-user-alt"
                            placeholder="Name"
                            value={name}
                            onChange={this.onChange}
                            error={errors.name}
                            others="mt-5"
                        />

                        <FormGroup
                            name="email"
                            type="email"
                            thumb="fas fa-envelope"
                            placeholder="E-mail"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                            others="mt-5"
                        />

                        <FormGroup
                            name="password"
                            type="password"
                            thumb="fas fa-lock"
                            placeholder="Password"
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                            others="mt-5"
                        />

                        <FormGroup
                            name="password2"
                            type="password"
                            thumb="fas fa-unlock-alt"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={this.onChange}
                            error={errors.password2}
                            others="mt-5"
                        />

                        <div className="mt-4 mb-5">
                            <div className="form__radio__group">
                                <input
                                    type="radio"
                                    className="form__radio__input"
                                    id="male"
                                    name="gender"
                                    value="M"
                                    onChange={this.onChange}
                                />
                                <label
                                    htmlFor="male"
                                    className="form__radio__label">
                                    <span className="form__radio__button" />
                                    Male
                                </label>
                            </div>

                            <div className="form__radio__group">
                                <input
                                    type="radio"
                                    className="form__radio__input"
                                    id="female"
                                    name="gender"
                                    value="F"
                                    onChange={this.onChange}
                                />
                                <label
                                    htmlFor="female"
                                    className="form__radio__label">
                                    <span className="form__radio__button" />
                                    Female
                                </label>
                            </div>

                            <div className="form__radio__group">
                                <input
                                    type="radio"
                                    className="form__radio__input"
                                    id="other"
                                    name="gender"
                                    value="O"
                                    onChange={this.onChange}
                                />
                                <label
                                    htmlFor="other"
                                    className="form__radio__label">
                                    <span className="form__radio__button" />
                                    Other
                                </label>
                            </div>
                        </div>
                        <div
                            className={classnames('', {
                                'form__invalid--msg': errors.gender,
                            })}>
                            {errors.gender}
                        </div>

                        <div className="mt-4 mb-5">
                            <div className="form__radio__group">
                                <input
                                    type="radio"
                                    className="form__radio__input"
                                    id="Student"
                                    name="role"
                                    value="Student"
                                    onChange={this.onChange}
                                />
                                <label
                                    htmlFor="Student"
                                    className="form__radio__label">
                                    <span className="form__radio__button" />
                                    Student
                                </label>
                            </div>

                            <div className="form__radio__group">
                                <input
                                    type="radio"
                                    className="form__radio__input"
                                    id="Instructor"
                                    name="role"
                                    value="Instructor"
                                    onChange={this.onChange}
                                />
                                <label
                                    htmlFor="Instructor"
                                    className="form__radio__label">
                                    <span className="form__radio__button" />
                                    Instructor
                                </label>
                            </div>
                        </div>
                        <div
                            className={classnames('', {
                                'form__invalid--msg': errors.role,
                            })}>
                            {errors.role}
                        </div>

                        <input
                            type="submit"
                            value="Sign Up!"
                            className="signup__card__btn"
                        />
                        <input type="hidden" name="_gotcha" />
                    </form>
                </div>
            </div>
        );
    }
}
//==========================================================================
Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createUser },
)(withRouter(Signup));
