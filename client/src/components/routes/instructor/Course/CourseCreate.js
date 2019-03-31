import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormGroup from '../../../layout/formGroup';
import isEmpty from '../../../../validation/isEmpty';
import { createCourse } from '../../../../redux/actions/Course Actions';

class CourseCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            price: '',
            about: '',
            logo: '',
            cover: '',
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
        const { errors, ...newCourse } = this.state;
        this.props.createCourse(newCourse, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const { title, price, about, logo, cover, errors } = this.state;
        return (
            <div className="data">
                <div className="data__card">
                    <form
                        noValidate
                        className="data__card__form"
                        onSubmit={this.onSubmit}>
                        <FormGroup
                            name="title"
                            type="text"
                            thumb="fas fa-user-alt"
                            placeholder="Title"
                            value={title}
                            onChange={this.onChange}
                            error={errors.title}
                            others="mt-5"
                        />

                        <FormGroup
                            name="price"
                            type="text"
                            thumb="fas fa-user-alt"
                            placeholder="Price"
                            value={price}
                            onChange={this.onChange}
                            error={errors.price}
                            others="mt-5"
                        />

                        <FormGroup
                            name="about"
                            type="text"
                            thumb="fas fa-envelope"
                            placeholder="About"
                            value={about}
                            onChange={this.onChange}
                            error={errors.about}
                            others="mt-5"
                        />

                        <FormGroup
                            name="logo"
                            type="url"
                            thumb="fas fa-lock"
                            placeholder="Logo Image"
                            value={logo}
                            onChange={this.onChange}
                            error={errors.logo}
                            others="mt-5"
                        />

                        <FormGroup
                            name="cover"
                            type="url"
                            thumb="fas fa-unlock-alt"
                            placeholder="Cover Image"
                            value={cover}
                            onChange={this.onChange}
                            error={errors.cover}
                            others="mt-5"
                        />

                        <input type="hidden" name="_gotcha" />

                        <input
                            type="submit"
                            value="Submit"
                            className="data__card__btn"
                        />
                    </form>
                </div>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createCourse },
)(withRouter(CourseCreate));
