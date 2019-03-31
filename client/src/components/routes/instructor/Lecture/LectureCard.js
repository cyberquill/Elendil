import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { selectLecture } from '../../../../redux/actions/Lecture Actions';

class LectureCard extends Component {
    //==========================================================================
    constructor(props) {
        super(props);

        this.lectureHandler = this.lecturesHandler.bind(this);
    }
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.errors) && this.props.errors !== 'Unauthorized')
            this.setState({ errors: this.props.errors });

        if (!isEmpty(this.props.activeLecture))
            this.props.history.push('/dashboard/course/lectures');
    }
    //==========================================================================
    lectureHandler = e => {
        e.preventDefault();
        this.props.getLectures(this.props.activeCourse._id);
    };
    //==========================================================================
    render() {
        const { name, sno, link, date, description, thumb } = this.props;
        return (
            <div className="lcard">
                <img src="" alt="" className="lcard__thumb" />
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    activeLecture: state.lectures.activeLecture,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectLecture },
)(withRouter(LectureCard));
