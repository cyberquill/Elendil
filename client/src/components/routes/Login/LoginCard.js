import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../../layout/formGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/Auth Actions';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        
        if (newProps.errors) 
            this.setState({ errors: newProps.errors });

        if (newProps.auth.isAuthenticated) 
            this.props.history.push('/');
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const user = { email, password };
        this.props.loginUser(user);
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

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

const mapStatesToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStatesToProps,{ loginUser })(withRouter(Login));
