import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { selectLecture } from '../../../../redux/actions/Lecture Actions';

class LectureCard extends Component {
    //==========================================================================
    constructor(props) {
        super(props);

        this.lectureHandler = this.lectureHandler.bind(this);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.errors) && this.props.errors !== 'Unauthorized')
            this.setState({ errors: this.props.errors });

        /* if (!isEmpty(this.props.))
            this.props.history.push('/dashboard/course/lectures'); */
    }
    //==========================================================================
    lectureHandler = e => {
        e.preventDefault();
        this.props.selectLecture(this.props.index);
    };
    //==========================================================================
    render() {
        const { name, linkID, date } = this.props;
        return (
            <a href="#" className="lcard" onClick={this.lectureHandler}>
                <img
                    src={`https://img.youtube.com/vi/${linkID}/maxresdefault.jpg`}
                    alt="Lecture Thumb"
                    className="lcard__thumb"
                />
                <div className="lcard__name">{name}</div>
                <div className="lcard__date">{date}</div>
            </a>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    lectures: state.lectures,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectLecture },
)(withRouter(LectureCard));
