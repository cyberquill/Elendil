import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { selectCourse } from '../../../../redux/actions/Course Actions';

class DashCard extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }
    //==========================================================================
    clickHandler = e => {
        e.preventDefault();
        this.props.selectCourse(this.props.index);
    };
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (this.props.activeCourse.title === this.props.title)
            this.props.history.push(this.props.link);
    }
    //==========================================================================
    render() {
        const { image, title, about, link } = this.props;
        return (
            <Link to={link} onClick={this.clickHandler}>
                <div className="card">
                    <img src={image} className="card-img" alt="" />
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
