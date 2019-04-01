import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {
    getQuestions,
    createQuestion,
} from '../../../redux/actions/Question Actions';
import { createAnswer } from '../../../redux/actions/Answer Actions';
import qaCard from './qaCard';

class QA extends Component {
    //==========================================================================
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: '',
            cid: this.props.activeCourse._id,
            errors: {},
        };

        this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
        this.onAnswerSubmit = this.onAnswerSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    //==========================================================================
    componentDidMount() {
        this.props.getQuestions(this.props.activeCourse._id);
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
    onQuestionSubmit = e => {
        let newQuestion = {};
        newQuestion.text = this.state.question;
        newQuestion.cid = this.state.cid;
        this.props.createQuestion(newQuestion, this.props.history);
    };
    //==========================================================================
    onAnswerSubmit = e => {
        let newAnswer = {};
        newAnswer.text = this.state.answer;
        newAnswer.qid = this.props.questions.activeQuestion._id;
        this.props.createAnswer(newAnswer, this.props.history);
    };
    //==========================================================================
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    //==========================================================================
    render() {
        const qaCardStack = this.props.questions.list.map((q, index) => {
            <qaCard 
            
            />
        };

        return (
            <React.Fragment>
                <div className="accordion qa" id="accordionExample">
                    <div className="qa__title">Questions & Answers</div>
                    <div className="qa__button">
                        <button
                            type="button"
                            class="btn btn-outline-primary btn-lg mb-5"
                            data-toggle="modal"
                            data-target="#exampleModal">
                            Ask a Question
                        </button>
                    </div>
                    {qaCardStack}
                </div>













                <div
                    class="modal fade text-dark"
                    id="exampleModal2"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModal2Label"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModal2Label">
                                    Add an Answer:
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form noValidate>
                                <div class="modal-body">
                                    <input
                                        type="text"
                                        name="answer"
                                        className="form-control"
                                        value={this.state.answer}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal">
                                        Close
                                    </button>
                                    <input
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Submit"
                                        data-dismiss="modal"
                                        onClick={this.onAnswerSubmit}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade text-dark"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Ask a Question:
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form noValidate>
                                <div class="modal-body">
                                    <input
                                        type="text"
                                        name="question"
                                        className="form-control"
                                        value={this.state.question}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal">
                                        Close
                                    </button>
                                    <input
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Submit"
                                        data-dismiss="modal"
                                        onClick={this.onQuestionSubmit}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    questions: state.questions,
    answers: state.answers,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getQuestions, createQuestion, createAnswer },
)(withRouter(QA));
