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
        const { image, title, inst, price, cid, iid } = this.props;

        return (
            <Link to="/dashboard/course/" onClick={this.clickHandler}>
                <div className="courseCard">
                    <img src={image} className="courseCard__img" alt="" />
                    <div className="courseCard__title">{title}</div>
                    <img
                        src={inst.profilePic}
                        className="courseCard__inst-img"
                        alt=""
                    />
                    <div className="courseCard__inst-name">{inst.name}</div>
                    <div className="courseCard__price">&#x20b9;{price}</div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { selectCourse },
)(withRouter(CourseCard));
