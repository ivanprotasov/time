import React, { PureComponent } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import ReactModal from 'react-modal';

import TimeZone from '../time-zone/TimeZone.js';
import { getSelectedTimeZones, getZones } from '../../redux/selectors';
import {
    addTimeZone,
    removeTimeZone,
    loadTimeZones
} from '../../redux/actions';

class WorldTime extends PureComponent {
    constructor() {
        super();
        this.state = {
            selectedZone: {
                zoneName: '',
                gmtOffset: 0
            },
            showModal: false,
            inputValue: '',
            zoneRemoveID: '',
            zoneRemoveName: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleRemoveTimeZone = this.handleRemoveTimeZone.bind(this);
    }

    componentDidMount() {
        this.props.loadTimeZones();
    }

    handleSelect(zoneName) {
        this.setState({
            selectedZone: this.props.zones.find(
                zone => zone.zoneName === zoneName
            ),
            inputValue: zoneName
        });
    }

    handleChange(e) {
        this.setState({ inputValue: e.target.value });
    }

    handleClick() {
        if (
            this.props.selectedTimeZones.find(
                zone =>
                    zone.content.zoneName === this.state.selectedZone.zoneName
            ) ||
            !this.state.inputValue
        )
            return; //to improve

        this.props.addTimeZone(this.state.selectedZone);
        this.setState({ inputValue: '' });
    }

    handleOpenModal(zoneID, zoneName) {
        this.setState({
            showModal: true,
            zoneRemoveID: zoneID,
            zoneRemoveName: zoneName
        });
    }

    handleCloseModal() {
        this.closeModal();
    }

    handleRemoveTimeZone() {
        this.handleCloseModal();
        this.props.removeTimeZone(this.state.zoneRemoveID);
    }

    closeModal() {
        this.setState({
            showModal: false,
            zoneRemoveID: ''
        });
    }

    render() {
        const { t, selectedTimeZones, zones } = this.props,
            { inputValue } = this.state;
        return (
            <div className="container">
                <h2>{t('World time')}</h2>
                {!zones ? (
                    <div>{t('Loading...')}</div>
                ) : (
                    <div>
                        <div className="input-group input-group-inner-div mb-3">
                            <ReactAutocomplete
                                items={zones}
                                shouldItemRender={(item, value) =>
                                    item.zoneName
                                        .toLowerCase()
                                        .indexOf(value.toLowerCase()) > -1
                                }
                                getItemValue={item => item.zoneName}
                                renderItem={(item, highlighted) => (
                                    <div
                                        key={item.zoneName}
                                        style={{
                                            backgroundColor: highlighted
                                                ? '#eee'
                                                : 'transparent'
                                        }}>
                                        {item.zoneName}
                                    </div>
                                )}
                                value={inputValue}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                                inputProps={{
                                    className: 'custom-select',
                                    placeholder: t('Please, add region...')
                                }}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.handleClick}>
                                    {t('Add region')}
                                </button>
                            </div>
                        </div>
                        {selectedTimeZones.length ? (
                            <ul className="list-group">
                                {selectedTimeZones.map(({ id, content }) => (
                                    <li className="list-group-item" key={id}>
                                        <TimeZone
                                            zoneName={content.zoneName}
                                            zoneID={id}
                                            gmtOffset={content.gmtOffset}
                                            onRemove={this.handleOpenModal}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                )}
                <ReactModal //TODO - move to common component
                    isOpen={this.state.showModal}
                    bodyOpenClassName="modal-open"
                    overlayClassName="modal"
                    className="modal-dialog"
                    ontentLabel="Minimal Modal Example">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>{t('Region removing...')}</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={this.handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                {t('Remove region?', {
                                    timeZone: this.state.zoneRemoveName
                                })}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={this.handleCloseModal}>
                                {t('No')}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={this.handleRemoveTimeZone}>
                                {t('Yes')}
                            </button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

export default withNamespaces()(
    connect(
        state => ({
            selectedTimeZones: getSelectedTimeZones(state),
            zones: getZones(state)
        }),
        {
            addTimeZone: addTimeZone,
            removeTimeZone: removeTimeZone,
            loadTimeZones
        }
    )(WorldTime)
);
