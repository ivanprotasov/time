import React, { Component } from 'react';
import Axios from 'axios';
import { withNamespaces } from 'react-i18next';
import CityTime from './CityTime.js';

class WorldTime extends Component {
    constructor() {
        super();
        this.state = {
            zoneNames: ['Minsk', 'Brest', 'Hrodno'],
            zones: [],
            selectedZone: {
                zoneName: 'Minsk',
                gmtOffset: 3600
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick() {
        Axios.get(
            'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
        ).then(response => {
            let zones = response.data.zones,
                zoneNames = response.data.zones.map(zone => zone.zoneName);
            this.setState({ zoneNames: zoneNames });
            this.setState({ zones: zones });
        });
    }
    handleChange(event) {
        this.setState({ selectedZone: this.state.zones[event.target.value] });
    }
    render() {
        const { t } = this.props;

        return (
            <div>
                <h2>{t('World time')}</h2>
                <h3>{this.state.selectedZone.zoneName}</h3>
                <select
                    value={this.state.selectedZone.zoneName}
                    onChange={this.handleChange}>
                    {this.state.zoneNames.map((zoneName, index) => (
                        <option key={index} value={index}>
                            {zoneName}
                        </option>
                    ))}
                </select>
                <button className="button" onClick={this.handleClick}>
                    Click Me
                </button>
                <CityTime
                    gmtOffset={this.state.selectedZone.gmtOffset}
                    zoneName={this.state.selectedZone.zoneName}
                />
            </div>
        );
    }
}

export default withNamespaces()(WorldTime);
