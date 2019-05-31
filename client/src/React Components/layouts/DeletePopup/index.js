import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    approveDeletion,
    resetDeletion,
} from '../../../redux/actions/Delete Actions';

class DeletePopup extends Component {
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (!prevProps.trigger && this.props.trigger) {
            const popup = document.getElementById('delPop');
            popup.firstChild.classList.add('delPop__content--active');
            popup.classList.add('delPop--active');
        }
    }
    //==========================================================================
    deletePopupClose = e => {
        const popup = document.getElementById('delPop');
        popup.firstChild.classList.remove('delPop__content--active');
        setTimeout(() => {
            popup.classList.remove('delPop--active');
        }, 400);
        //this.abort();
    };
    //==========================================================================
    proceed = e => this.props.approveDeletion();
    //==========================================================================
    abort = e => this.props.resetDeletion();
    //==========================================================================
    render() {
        return (
            <div className="delPop" id="delPop" onClick={this.deletePopupClose}>
                <div className="delPop__content">
                    <div className="delPop__card">
                        <div className="delPop__heading">
                            Are you sure you want to delete this?
                        </div>
                        <div className="delPop__btn-group">
                            <button
                                className="elbtn__type3"
                                onClick={this.proceed}>
                                Yes
                            </button>
                            <button
                                className="elbtn__type3"
                                onClick={this.abort}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//==========================================================================
const mapStateToProps = state => ({
    trigger: state.deletion.trigger,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { resetDeletion, approveDeletion },
)(withRouter(DeletePopup));
