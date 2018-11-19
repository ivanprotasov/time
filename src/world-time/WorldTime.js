import React, { Component } from 'react';
import Axios from 'axios';
import { withNamespaces } from 'react-i18next';
import CityTime from './CityTime.js';

class WorldTime extends Component {
    constructor() {
        super();
        this.state = {
            zoneNames: ['Minsk', 'Brest', 'Hrodno'],
            selectedZone: 'Minsk'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick() {
        Axios.get(
            'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
        ).then(response => {
            let zones = response.data.zones.map(zone => zone.zoneName);
            this.setState({ zoneNames: zones });
        });
    }
    handleChange(event) {
        console.log(event.target.value);
        this.setState({ selectedZone: event.target.value });
    }
    render() {
        const { t } = this.props;

        return (
            <div>
                <h2>{t('World time')}</h2>
                <h3>{this.state.selectedZone}</h3>
                <select
                    value={this.state.selectedZone}
                    onChange={this.handleChange}>
                    {this.state.zoneNames.map((zoneName, index) => (
                        <option key={index} value={zoneName}>
                            {zoneName}
                        </option>
                    ))}
                </select>
                <button className="button" onClick={this.handleClick}>
                    Click Me
                </button>
                <CityTime gmtOffset="345" zoneName="city" />
            </div>
        );
    }
}

export default withNamespaces()(WorldTime);
