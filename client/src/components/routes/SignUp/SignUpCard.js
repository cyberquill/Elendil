import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createUser } from '../../../redux/actions/Auth Actions';
import FormGroup from '../../layout/formGroup';
import axios from 'axios';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            role: '',
            gender: '',
            profilePic: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    //==========================================================================
    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }
    //==========================================================================
    onSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        // Gender Assignment:
        if (e.target[5].checked) await this.setState({ gender: 'M' });
        else if (e.target[6].checked) await this.setState({ gender: 'F' });
        else if (e.target[7].checked) await this.setState({ gender: 'O' });

        this.props.createUser(this.state, this.props.history);
    };
    //==========================================================================
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const {
            name,
            email,
            password,
            password2,
            role,
            gender,
            profilePic,
            errors,
        } = this.state;
        return (
            <div className="signup__card">
                <form
                    noValidate
                    className="signup__card__form"
                    onSubmit={this.onSubmit}>
                    <FormGroup
                        name="profilePic"
                        type="url"
                        thumb="fas fa-user-alt"
                        placeholder="Profile Picture"
                        value={profilePic}
                        onChange={this.onChange}
                        error={errors.profilePic}
                        others="mt-5"
                    />

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
                        <div className="form__radio-group">
                            <input
                                type="radio"
                                className="form__radio-input"
                                id="male"
                                name="gender"
                            />
                            <label htmlFor="male" className="form__radio-label">
                                <span className="form__radio-button" />
                                Male
                            </label>
                        </div>

                        <div className="form__radio-group">
                            <input
                                type="radio"
                                className="form__radio-input"
                                id="female"
                                name="gender"
                            />
                            <label
                                htmlFor="female"
                                className="form__radio-label">
                                <span className="form__radio-button" />
                                Female
                            </label>
                        </div>

                        <div className="form__radio-group">
                            <input
                                type="radio"
                                className="form__radio-input"
                                id="other"
                                name="gender"
                            />
                            <label
                                htmlFor="other"
                                className="form__radio-label">
                                <span className="form__radio-button" />
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

                    <input type="hidden" name="_gotcha" />

                    <input
                        type="submit"
                        value="Sign Up!"
                        className="signup__card__btn"
                    />
                </form>
            </div>
        );
    }
}
//==========================================================================
SignUp.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
//==========================================================================
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createUser },
)(withRouter(SignUp));
