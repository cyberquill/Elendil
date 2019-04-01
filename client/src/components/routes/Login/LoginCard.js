import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormGroup from '../../layout/formGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/Auth Actions';
import { getCreateInstructor } from '../../../redux/actions/Instructor Actions';
import isEmpty from '../../../validation/isEmpty';

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
    /* componentDidMount() {
        if (!isEmpty(this.props.auth.user))
            this.props.history.push('/dashboard');
    } */
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });

        if (!isEmpty(this.props.instructor))
            this.props.history.push('/dashboard');

        if (!isEmpty(this.props.auth.user) && isEmpty(this.props.instructor))
            this.props.getCreateInstructor(this.props.auth.user.id);
    }
    //==========================================================================
    onSubmit = e => {
        e.preventDefault();
        const { errors, ...user } = this.state;
        this.props.loginUser(user);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { email, password, errors } = this.state;
        return (
            <div className="login__card">
                <div className="login__card__pic">
                    <i className="zmdi zmdi-landscape" />
                </div>
                <form
                    noValidate
                    className="login__card__form"
                    onSubmit={this.onSubmit}>
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
                        others="mt-4 mb-5"
                    />
                    <div className="form__radio-group2">
                        <input
                            type="radio"
                            className="form__radio-input"
                            id="Student"
                            name="role"
                            value="Student"
                            onChange={this.onChange}
                        />
                        <label htmlFor="Student" className="form__radio-label">
                            <span className="form__radio-button" />
                            Student
                        </label>
                    </div>

                    <div className="form__radio-group2">
                        <input
                            type="radio"
                            className="form__radio-input"
                            id="Instructor"
                            name="role"
                            value="Instructor"
                            onChange={this.onChange}
                        />
                        <label
                            htmlFor="Instructor"
                            className="form__radio-label">
                            <span className="form__radio-button" />
                            Instructor
                        </label>
                    </div>
                    <div
                        className={classnames('', {
                            'form__invalid--msg': errors.role,
                        })}>
                        {errors.role}
                    </div>

                    <input type="hidden" name="_gotcha" />

                    <button className="login__card__btn">Login!</button>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStatesToProps = state => ({
    auth: state.auth,
    instructor: state.instructor,
    errors: state.errors,
});

export default connect(
    mapStatesToProps,
    { loginUser, getCreateInstructor },
)(withRouter(Login));
