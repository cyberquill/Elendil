import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';

class SideBar extends Component {
    render() {
        const { pathname } = this.props.location;

        if (
            pathname === '/' ||
            pathname === '/signup' ||
            pathname === '/login'
        )
            return null;

        const { name, email, role, profilePic } = this.props.user;

        return (
            <section className="sidebar">
                <Link to="/" className="sidebar__heading">
                    Elendil
                </Link>
                <img
                    src={profilePic}
                    className="sidebar__img"
                    alt="profile Picture"
                />
                <div className="sidebar__name">{name}</div>
                <div className="sidebar__role">{role}</div>
            </section>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    {},
)(withRouter(SideBar));
