import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../../components/FormGroup';
import { createUser } from '../../../redux/actions/User Actions';

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
        let { errors, ...newUser } = this.state;
        newUser.profilePic = 'https://res.cloudinary.com/brij1999/image/upload/v1575459234/user_black.png';
        this.props.createUser(newUser, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { name, email, password, password2, errors } = this.state;
        return (
            <div className="signup__back">
                <div className="signup">
                    <div className="signup__display">Signup to Continue!</div>
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
                            />

                            <FormGroup
                                name="email"
                                type="email"
                                thumb="fas fa-envelope"
                                placeholder="E-mail"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                            />

                            <FormGroup
                                name="password"
                                type="password"
                                thumb="fas fa-lock"
                                placeholder="Password"
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                            />

                            <FormGroup
                                name="password2"
                                type="password"
                                thumb="fas fa-unlock-alt"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />

                            <div className="signup__card__form--radio">
                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="male"
                                        name="gender"
                                        value="M"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        htmlFor="male"
                                        className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Male
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="female"
                                        name="gender"
                                        value="F"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        htmlFor="female"
                                        className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Female
                                    </label>
                                </div>

                                <div className="form-radioGroup">
                                    <input
                                        type="radio"
                                        className="form-radioGroup__input"
                                        id="other"
                                        name="gender"
                                        value="O"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        htmlFor="other"
                                        className="form-radioGroup__label">
                                        <span className="form-radioGroup__button" />
                                        Other
                                    </label>
                                </div>

                                <div
                                    className={classnames('', {
                                        'form-radioGroup--invalid':
                                            errors.gender,
                                    })}>
                                    {errors.gender}
                                </div>
                            </div>

                            <div className="signup__card__form--radio">
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

                                <div
                                    className={classnames('', {
                                        'form-radioGroup--invalid': errors.role,
                                    })}>
                                    {errors.role}
                                </div>
                            </div>

                            <input
                                type="submit"
                                value="Sign Up!"
                                className="elbtn__type2"
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
