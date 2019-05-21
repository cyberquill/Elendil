import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import DeletePopup from '../DeletePopup';
import { deleteAnswers } from '../../../redux/actions/Answer Actions';

class ConvoBubble extends Component {
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!isEmpty(this.props.errors) && this.props.errors !== prevProps.errors && this.props.errors !== 'Unauthorized')
            this.setState({ errors: this.props.errors });
    }
    //==========================================================================
    deleteHandler = (aid, e) => {
        this.props.deleteAnswers(aid);
    };
    //==========================================================================
    delPopupHandler() {
        const popup = document.getElementById('delPop');
        popup.firstChild.classList.add('delPop__content--active');
        popup.classList.add('delPop--active');
    }
    //==========================================================================
    render() {
        const { name, owner, profilePic, date, aid, text } = this.props;

        let type = 'passive';
        if (name === owner) type = 'active';

        let deleteBtn = null;
        if (name === this.props.user.name && aid !== '-1') {
            deleteBtn = (
                <Fragment>
                    <button className={`convoBubble__${type}--delete`} onClick={this.delPopupHandler}>
                        &times;
                    </button>
                    <DeletePopup del={this.deleteHandler.bind(this, aid)} />
                </Fragment>
            );
        }

        return (
            <div className={`convoBubble__${type}`}>
                <img src={profilePic} alt="Profile Pic" className={`convoBubble__${type}--pic`} />
                <div className={`convoBubble__${type}__box`}>
                    <div className={`convoBubble__${type}--name`}>{name}</div>
                    {deleteBtn}
                    <div className={`convoBubble__${type}--date`}>{date}</div>
                    <div className={`convoBubble__${type}--text`}>{text}</div>
                </div>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { deleteAnswers },
)(withRouter(ConvoBubble));
