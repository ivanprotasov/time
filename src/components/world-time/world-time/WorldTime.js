import React, { PureComponent } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import TimeZone from '../time-zone/TimeZone.js';
import { getSelectedTimeZones, getZones } from '../../../redux/selectors';
import {
    addTimeZone,
    removeTimeZone,
    loadTimeZones
} from '../../../redux/actions';
import ConfirmModal from '../../common/ConfirmModal';

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
    }

    componentDidMount() {
        this.props.loadTimeZones();
    }

    handleSelect = zoneName => {
        this.setState({
            selectedZone: this.props.zones.find(
                zone => zone.zoneName === zoneName
            ),
            inputValue: zoneName
        });
    };

    handleChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleClick = () => {
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
    };

    handleRemove = (zoneID, zoneName) => {
        this.setState({
            showModal: true,
            zoneRemoveID: zoneID,
            zoneRemoveName: zoneName
        });
    };

    handleCloseModal = () => {
        this.closeModal();
    };

    handleConfirm = () => {
        this.closeModal();
        this.props.removeTimeZone(this.state.zoneRemoveID);
    };

    closeModal() {
        this.setState({
            showModal: false,
            zoneRemoveID: '',
            zoneRemoveName: ''
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
                                            onRemove={this.handleRemove}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                )}
                <ConfirmModal
                    title={t('Region removing...')}
                    showModal={this.state.showModal}
                    onCloseModal={this.handleCloseModal}
                    onConfirm={this.handleConfirm}>
                    {t('Remove region?', {
                        timeZone: this.state.zoneRemoveName
                    })}
                </ConfirmModal>
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
