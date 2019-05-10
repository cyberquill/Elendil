import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { selectCourse } from '../../../redux/actions/Course Actions';

class CourseCard extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => {
        e.preventDefault();
        this.props.selectCourse(
            this.props.index,
            this.props.area,
            this.props.history,
        );
    };
    //==========================================================================
    render() {
        const { image, title, about, price } = this.props;
        return (
            <Link to="/" onClick={this.clickHandler}>
                <div className="courseCard">
                    <img src={image} className="courseCard__img" alt="" />
                    <div className="courseCard__title">{title}</div>
                    <div className="courseCard__desc">{about}</div>
                    <div className="courseCard__price">&#x20b9;{price}</div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = state => ({
    activeCourse: state.courses.activeCourse,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectCourse },
)(withRouter(CourseCard));
