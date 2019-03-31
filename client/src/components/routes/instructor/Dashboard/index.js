import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../../../validation/isEmpty';
import { getCourses } from '../../../../redux/actions/Course Actions';
import DashCard from './DashCard';

class dashboard extends Component {
    
    //==========================================================================
    componentWillMount() {
        if(isEmpty(this.props.user))
            this.props.history.push('/login');
            
        this.props.getCourses(this.props.user.id);
    }
    //==========================================================================
    render() {
        const Cards = this.props.courses.map((course, index) => (
            <DashCard
                image={course.logo}
                title={course.title}
                about={course.about}
                link={`dashboard/course/`}
                index={index}
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
    courses: state.courses.list,
    user: state.auth.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCourses },
)(withRouter(dashboard));
