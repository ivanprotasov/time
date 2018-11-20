import React, { Component } from 'react';
import Axios from 'axios';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import CityTime from './CityTime.js';

class WorldTime extends Component {
    constructor() {
        super();
        this.state = {
            zones: [],
            selectedZone: {
                zoneName: '',
                gmtOffset: 0
            },
            inputValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Axios.get(
            'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
        ).then(response => {
            let zones = response.data.zones;
            this.setState({ zones: zones });
        });
    }
    handleChange(zoneName) {
        this.setState({
            selectedZone: this.state.zones.find(
                zone => zone.zoneName === zoneName
            ),
            inputValue: zoneName
        });
    }
    render() {
        const { t } = this.props;
        let worldTime;
        if (this.state.zones.length === 0) {
            worldTime = <div>Loading...</div>;
        } else {
            worldTime = (
                <div>
                    <ReactAutocomplete
                        items={this.state.zones}
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
                        value={this.state.inputValue}
                        onChange={e =>
                            this.setState({ inputValue: e.target.value })
                        }
                        onSelect={this.handleChange}
                    />
                    <CityTime
                        gmtOffset={this.state.selectedZone.gmtOffset}
                        zoneName={this.state.selectedZone.zoneName}
                    />
                </div>
            );
        }
        return (
            <div>
                <h2>{t('World time')}</h2>
                {worldTime}
            </div>
        );
    }
}

export default withNamespaces()(WorldTime);
