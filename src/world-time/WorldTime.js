import React, { PureComponent } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import RegionTime from './RegionTime.js';

import { connect } from 'react-redux';
import { getRegions, getZones } from '../redux/selectors';
import { addRegion, loadTimeZones } from '../redux/actions';

class WorldTime extends PureComponent {
    constructor() {
        super();
        this.state = {
            selectedZone: {
                zoneName: '',
                gmtOffset: 0
            },
            inputValue: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemoveCountry = this.handleRemoveCountry.bind(this);
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
            this.props.selectedZones.find(
                zone =>
                    zone.content.zoneName === this.state.selectedZone.zoneName
            ) ||
            !this.state.inputValue
        )
            return; //to improve

        this.props.addRegion(this.state.selectedZone);
        this.setState({ inputValue: '' });
    }
    handleRemoveCountry(zoneName) {
        this.setState(prevState => ({
            selectedZones: prevState.selectedZones.filter(
                zone => zone.zoneName !== zoneName
            )
        }));
    }
    render() {
        const { t, selectedZones, zones } = this.props,
            { inputValue } = this.state;
        return (
            <div>
                <h2>{t('World time')}</h2>
                {!zones ? (
                    <div>{t('Loading...')}</div>
                ) : (
                    <div>
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
                        />
                        <button type="button" onClick={this.handleClick}>
                            {t('Add region')}
                        </button>
                        {selectedZones.length ? (
                            <ul>
                                {selectedZones.map(({ id, content }) => (
                                    <li key={id}>
                                        <RegionTime
                                            zoneName={content.zoneName}
                                            gmtOffset={content.gmtOffset}
                                            onRemove={this.handleRemoveCountry}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>{t('Please, add region...')}</div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default withNamespaces()(
    connect(
        state => ({
            selectedZones: getRegions(state),
            zones: getZones(state)
        }),
        { addRegion, loadTimeZones }
    )(WorldTime)
);
