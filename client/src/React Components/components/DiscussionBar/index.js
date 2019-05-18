import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
import { createAnswer } from '../../../redux/actions/Answer Actions';

class DiscussionBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
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
        const newAns = {};
        newAns.text = this.state.text;
        newAns.qid = this.props.activeQuestion._id;
        this.props.createAnswer(newAns, this.props.history);
        this.setState({text: ''});
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const { text, errors } = this.state;
        return (
            <form noValidate className="disBar" onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="text"
                    className="disBar__input"
                    value={text}
                    placeholder="Add something..."
                    onChange={this.onChange}
                />

                <input
                    type="submit"
                    value="Submit"
                    className="disBar__submit"
                />
            </form>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    activeQuestion: state.questions.activeQuestion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createAnswer },
)(withRouter(DiscussionBar));
