import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import { withNamespaces } from 'react-i18next';

class ConfirmModal extends PureComponent {
    handleCloseModal = () => {
        this.props.onCloseModal();
    };

    handleConfirm = () => {
        this.props.onConfirm();
    };

    render() {
        const { showModal, title, children, t } = this.props;

        return (
            <ReactModal
                isOpen={showModal}
                bodyOpenClassName="modal-open"
                overlayClassName="modal"
                className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>{title}</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={this.handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{children}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={this.handleCloseModal}>
                            {t('No')}
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.handleConfirm}>
                            {t('Yes')}
                        </button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default withNamespaces()(ConfirmModal);
