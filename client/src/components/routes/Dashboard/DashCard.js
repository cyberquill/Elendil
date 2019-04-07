import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { selectCourse } from '../../../redux/actions/Course Actions';

class DashCard extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => {
        e.preventDefault();
        this.props.selectCourse(this.props.index, this.props.area, this.props.history);
    };
    //==========================================================================
    render() {
        const { image, title, about } = this.props;
        return (
            <Link to='/' onClick={this.clickHandler}>
                <div className="card dashcard">
                    <img src={image} className="dashcard-img" alt="" />
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                    <div className="desc">
                        <p>{about}</p>
                    </div>
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
)(withRouter(DashCard));
