import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { getLectures } from '../../../../redux/actions/Lecture Actions';
import { getQuestions } from '../../../../redux/actions/Question Actions';

class Course extends Component {
    //==========================================================================
    constructor(props) {
        super(props);

        this.lecturesHandler = this.lecturesHandler.bind(this);
        this.questionsHandler = this.questionsHandler.bind(this);
    }
    //==========================================================================
    componentWillMount() {
        if (isEmpty(this.props.activeCourse)) this.props.history.push('/login');
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.errors) && this.props.errors !== 'Unauthorized')
            this.setState({ errors: this.props.errors });

        if (!isEmpty(this.props.activeLecture))
            this.props.history.push('/dashboard/course/lectures');

        if (!isEmpty(this.props.questions))
            this.props.history.push('/dashboard/course/questions');
    }
    //==========================================================================
    lecturesHandler = e => {
        e.preventDefault();
        this.props.getLectures(this.props.activeCourse._id);
    };
    //==========================================================================
    questionsHandler = e => {
        e.preventDefault();
        this.props.getQuestions(this.props.activeCourse._id);
    };
    //==========================================================================
    render() {
        const {
            title,
            about,
            logo,
            cover,
            price,
            date,
            nLectures,
            nStudents,
            nQuestions,
        } = this.props.activeCourse;

        let suggestions = [];

        if (isEmpty(this.props.suggestions))
            suggestions[0] = 'No suggestions yet...';

        const SuggestionList = suggestions.map((sg, index) => (
            <div className="course__suggestion" key={index}>
                {sg}
            </div>
        ));

        return (
            <div className="course">
                <img className="course__cover" src={cover} alt="Course Cover" />
                <img className="course__logo" src={logo} alt="Course Logo" />

                <div className="course__title">{title}</div>
                <div className="course__about">{about}</div>

                <div className="course__info-group">
                    {/* <div className="course__info">
                        Date Created:&emsp;{date}
                    </div> */}
                    <div className="course__info">
                        No. of Lectures: {nLectures}
                    </div>
                    <div className="course__info">
                        No. of Students: {nStudents}
                    </div>
                    <div className="course__info">
                        No. of Questions: {nQuestions}
                    </div>
                </div>

                <div className="course__btn-group">
                    <Link to="#" className="course__btn">
                        Price: ${price}
                    </Link>
                    <Link
                        to="/dashboard/course/lectures"
                        className="course__btn"
                        onClick={this.lecturesHandler}>
                        View Lectures
                    </Link>
                    <Link
                        to="/dashboard/course/questions"
                        className="course__btn"
                        onClick={this.questionsHandler}>
                        Q&A Section
                    </Link>
                </div>
                <section className="suggestion-list">
                    <div className="suggestion__heading">Suggestions :</div>
                    {SuggestionList}
                </section>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    activeLecture: state.lectures.activeLecture,
    questions: state.questions.list,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getLectures, getQuestions },
)(withRouter(Course));
