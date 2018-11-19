import React, { Component } from 'react';
import Axios from 'axios';
import { withNamespaces } from 'react-i18next';

class WorldTime extends Component<Props> {
    constructor() {
        super();
        this.state = {
            username: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        Axios.get(
            'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
        ).then(response => console.log(response));
    }
    render() {
        console.log(this.props);
        console.log(this.props.t);
        const { t } = this.props;

        return (
            <div>
                <h2>{t('World time')}</h2>
                <button className="button" onClick={this.handleClick}>
                    Click Me
                </button>
            </div>
        );
    }
}

export default withNamespaces()(WorldTime);
