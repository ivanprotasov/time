import React, { PureComponent } from 'react';
import Axios from 'axios';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import RegionTime from './RegionTime.js';

class WorldTime extends PureComponent {
    constructor() {
        super();
        this.state = {
            zones: [],
            selectedZones: [],
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
        Axios.get(
            'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
        ).then(response => {
            let zones = response.data.zones;
            this.setState({ zones: zones });
        });
    }
    handleSelect(zoneName) {
        this.setState({
            selectedZone: this.state.zones.find(
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
            this.state.selectedZones.find(
                zone => zone.zoneName === this.state.selectedZone.zoneName
            ) ||
            !this.state.inputValue
        )
            return; //to improve

        this.setState(prevState => {
            return {
                selectedZones: prevState.selectedZones.concat(
                    this.state.selectedZone
                ),
                inputValue: ''
            };
        });
    }
    handleRemoveCountry(zoneName) {
        this.setState(prevState => ({
            selectedZones: prevState.selectedZones.filter(
                zone => zone.zoneName !== zoneName
            )
        }));
    }
    render() {
        const { t } = this.props,
            { zones, selectedZones, inputValue } = this.state;
        return (
            <div>
                <h2>{t('World time')}</h2>
                {zones.length === 0 ? (
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
                                {selectedZones.map(
                                    ({ zoneName, gmtOffset }) => (
                                        <li key={zoneName}>
                                            <RegionTime
                                                zoneName={zoneName}
                                                gmtOffset={gmtOffset}
                                                onRemove={
                                                    this.handleRemoveCountry
                                                }
                                            />
                                        </li>
                                    )
                                )}
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

export default withNamespaces()(WorldTime);
