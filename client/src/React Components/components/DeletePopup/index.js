import React, { Component } from 'react';

class DeletePopup extends Component {
    //==========================================================================
    deletePopupClose = e => {
        const popup = document.getElementById('delPop');
        popup.firstChild.classList.remove('delPop__content--active');
        setTimeout(() => {
            popup.classList.remove('delPop--active');
        }, 400);
    };
    //==========================================================================
    render() {
        return (
            <div className="delPop" id="delPop" onClick={this.deletePopupClose}>
                <div className="delPop__content">
                    <div className="delPop__card">
                        <div className="delPop__heading">Are you sure you want to delete this?</div>
                        <div className="delPop__btn-group">
                            <button className="elbtn__type3" onClick={this.props.del}>Yes</button>
                            <button className="elbtn__type3">No</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeletePopup;
