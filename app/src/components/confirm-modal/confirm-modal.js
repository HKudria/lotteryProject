import React from "react";

const ConfirmModal = ({target,method}) => {
    return (
        <div id={target} uk-modal="true" container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Save</h2>
                <p>Do you really want to save all the changes?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Cancel
                    </button>
                    <button
                        className="uk-button uk-button-primary uk-modal-close"
                        type="button"
                        onClick={() => method()}>Save
                    </button>
                </p>
            </div>
        </div>
    );
}

export default ConfirmModal