import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormGroup from '../layouts/formGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/User Actions';
import isEmpty from '../../validation/isEmpty';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            role: '',
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
        const { errors, ...user } = this.state;
        this.props.loginUser(user, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { email, password, errors } = this.state;
        return (
            <div className="login__back">
                <div className="login">
                    <div className="login__display">Login to Continue!</div>
                    <div className="login__card">
                        <form
                            noValidate
                            className="login__card__form"
                            onSubmit={this.onSubmit}>
                            
                            <div className="login__card__form__heading">Login</div>

                            <FormGroup
                                name="email"
                                type="email"
                                thumb="fas fa-envelope"
                                placeholder="E-mail"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                                others="mt-4"
                            />

                            <FormGroup
                                name="password"
                                type="password"
                                thumb="fas fa-lock"
                                placeholder="Password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                                others="mt-4"
                            />

                            <div className="login__card__form--radio mt-4">
                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="Student"
                                        name="role"
                                        value="Student"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        htmlFor="Student"
                                        className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Student
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="Instructor"
                                        name="role"
                                        value="Instructor"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        htmlFor="Instructor"
                                        className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
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
                                value="Log In!"
                                className="login__card__form__btn"
                            />

                            <input type="hidden" name="_gotcha" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStatesToProps = state => ({
    user: state.user,
    errors: state.errors,
});
//==========================================================================
export default connect(
    mapStatesToProps,
    { loginUser },
)(withRouter(Login));
