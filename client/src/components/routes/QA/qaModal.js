import React from 'react';

export default function qaModal(id, text, value, onChange, onSubmit) {
    return (
        <div
            class="modal fade text-dark"
            id={id}
            tabindex="-1"
            role="dialog"
            aria-labelledby={`${id}Label`}
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={`${id}Label`}>
                            {text}
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form noValidate>
                        <div class="modal-body">
                            <input
                                type="text"
                                name="answer"
                                className="form-control"
                                value={value}
                                onChange={onChange}
                            />
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal">
                                Close
                            </button>
                            <input
                                type="submit"
                                class="btn btn-primary"
                                value="Submit"
                                data-dismiss="modal"
                                onClick={onSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
