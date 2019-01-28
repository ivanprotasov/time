import React, { Fragment, PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import { getSelectedTimeZones, getZones } from '../../../redux/selectors';
import { removeTimeZone, loadTimeZones } from '../../../redux/actions';

import ConfirmModal from '../../common/ConfirmModal';
import SearchTimeZone from '../search-time-zone/SearchTimeZone.js';
import TimeZone from '../time-zone/TimeZone.js';

class WorldTime extends PureComponent {
    constructor() {
        super();
        this.state = {
            showModal: false,
            removeZoneID: '',
            removeZoneName: ''
        };
    }

    componentDidMount() {
        this.props.loadTimeZones();
    }

    handleRemove = (zoneID, zoneName) => {
        this.setState({
            showModal: true,
            removeZoneID: zoneID,
            removeZoneName: zoneName
        });
    };

    handleCloseModal = () => {
        this.closeModal();
    };

    handleConfirm = () => {
        this.closeModal();
        this.props.removeTimeZone(this.state.removeZoneID);
    };

    closeModal() {
        this.setState({
            showModal: false,
            removeZoneID: '',
            removeZoneName: ''
        });
    }

    render() {
        const { t, selectedTimeZones, allTimeZones } = this.props;
        return (
            <div className="container">
                <h2>{t('World time')}</h2>
                {!allTimeZones ? (
                    <div>{t('Loading...')}</div>
                ) : (
                    <Fragment>
                        <div className="input-group input-group-inner-div mb-3">
                            <SearchTimeZone
                                allTimeZones={allTimeZones}
                                selectedTimeZones={selectedTimeZones}
                            />
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
                    </Fragment>
                )}
                <ConfirmModal
                    title={t('Region removing...')}
                    showModal={this.state.showModal}
                    onCloseModal={this.handleCloseModal}
                    onConfirm={this.handleConfirm}>
                    {t('Remove region?', {
                        timeZone: this.state.removeZoneName
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
            allTimeZones: getZones(state)
        }),
        {
            removeTimeZone: removeTimeZone,
            loadTimeZones
        }
    )(WorldTime)
);
