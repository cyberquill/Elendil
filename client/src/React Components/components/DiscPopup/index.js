import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import FormGroup from '../FormGroup';
import { createQuestion } from '../../../redux/actions/Question Actions';

class DiscPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.discPopupClose = this.discPopupClose.bind(this);
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
        const newQues = {};
        newQues.text = this.state.text;
        newQues.cid = this.props.activeCourse._id;
        this.props.createQuestion(newQues, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    discPopupClose = e => {
        const popup = document.getElementById('discPop');
        const btn = document.getElementById('discPop--btn');
        if (e.target !== popup && e.target !== btn) return;
        popup.firstChild.classList.remove('discPop__content--active');
        setTimeout(() => {
            popup.classList.remove('discPop--active');
        }, 400);
    }
    //==========================================================================
    render() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push('/dashboard');
            return null;
        }

        const { text, errors } = this.state;
        return (
            <div
                className="discPop"
                id="discPop"
                onClick={this.discPopupClose}>
                <div className="discPop__content">
                    <div className="discPop__card">
                        <form
                            noValidate
                            className="discPop__card__form"
                            onSubmit={this.onSubmit}>
                            <FormGroup
                                name="text"
                                type="text"
                                thumb="fas fa-signature"
                                placeholder="Start a new discussion...."
                                value={text}
                                onChange={this.onChange}
                                error={errors.text}
                                others=""
                            />

                            <input type="hidden" name="_gotcha" />

                            <input
                                type="submit"
                                value="Submit"
                                id="discPop--btn"
                                className="elbtn__type2"
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
    { createQuestion },
)(withRouter(DiscPopup));
