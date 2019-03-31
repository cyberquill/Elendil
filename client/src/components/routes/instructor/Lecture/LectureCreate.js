import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormGroup from '../../../layout/formGroup';
import isEmpty from '../../../../validation/isEmpty';
import { createLecture } from '../../../../redux/actions/Lecture Actions';

class LectureCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            linkID: '',
            cid: this.props.activeCourse._id,
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
        const { errors, ...newLecture } = this.state;
        this.props.createLecture(newLecture, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const { name, description, linkID, errors } = this.state;
        return (
            <div className="data">
                <div className="login__card">
                    <form
                        noValidate
                        className="data__card__form"
                        onSubmit={this.onSubmit}>
                        <FormGroup
                            name="name"
                            type="text"
                            thumb="fas fa-user-alt"
                            placeholder="name"
                            value={name}
                            onChange={this.onChange}
                            error={errors.name}
                            others="mt-5"
                        />

                        <FormGroup
                            name="description"
                            type="text"
                            thumb="fas fa-envelope"
                            placeholder="description"
                            value={description}
                            onChange={this.onChange}
                            error={errors.description}
                            others="mt-5"
                        />

                        <FormGroup
                            name="linkID"
                            type="url"
                            thumb="fas fa-lock"
                            placeholder="linkID Image"
                            value={linkID}
                            onChange={this.onChange}
                            error={errors.linkID}
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
    activeCourse: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createLecture },
)(withRouter(LectureCreate));
