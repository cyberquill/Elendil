import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../../../redux/actions/Course Actions';
import DashCard from './DashCard';

class dashboard extends Component {
    constructor(props) {
        super(props);
    }
    //==========================================================================
    componentWillMount() {
        this.props.getCourses(this.props.user.id);
    }
    //==========================================================================
    render() {
        const Cards = this.props.courses.map((course, index) => (
            <DashCard
                image={course.logo}
                title={course.title}
                about={course.about}
                link={`/course/${course.id}`}
                key={index}
            />
        ));

        return (
            <section>
                <div className="cardGroup">{Cards}</div>
            </section>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    user: state.auth.user,
    courses: state.courses.list,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCourses },
)(dashboard);
