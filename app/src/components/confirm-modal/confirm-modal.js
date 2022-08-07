import React from "react";
import UIkit from "uikit";

const ConfirmModal = ({target,method}) => {
    return (
        <div id={target} uk-modal="true" container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Save</h2>
                <p>Do you really want to save all the changes?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel
                    </button>
                    <button
                        className="uk-button uk-button-primary uk-modal-close"
                        type="button"
                        onClick={() => method(() => {
                                UIkit.notification({message: 'Successful saved ', status: 'success'})
                            },
                            () => {
                                UIkit.notification({
                                    message: 'Something was wrong. Please try again later or contact with IT specialist ',
                                    status: 'danger'
                                })
                            })}>Save
                    </button>
                </p>
            </div>
        </div>
    );
}

export default ConfirmModal