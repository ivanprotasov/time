import React, { PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';

class RegionTime extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const date = new Date();

        if (this.state.date.getMinutes() !== date.getMinutes()) {
            // set date only when minutes are changed
            this.setState({ date: date });
        }
    }

    handleClick() {
        this.props.onRemove(this.props.zoneName);
    }

    render() {
        const date = this.state.date,
            { gmtOffset, zoneName, t } = this.props,
            offsetMilliseconds =
                date.getTimezoneOffset() * 1000 * 60 + gmtOffset * 1000,
            offsetHours = offsetMilliseconds / 3600000,
            offsetDate = new Date(date.getTime() + offsetMilliseconds),
            offsetDateHours = offsetDate.getHours(),
            currentDateHours = date.getHours();

        let dayStatus;

        if (offsetMilliseconds < 0 && offsetDateHours > currentDateHours) {
            dayStatus = <div>{t('Yesterday')}</div>;
        } else if (
            offsetMilliseconds > 0 &&
            offsetDateHours < currentDateHours
        ) {
            dayStatus = <div>{t('Tomorrow')}</div>;
        } else {
            dayStatus = <div>{t('Today')}</div>;
        }

        return (
            <div>
                {zoneName === '' ? (
                    <div>{t('Sorry, wrong region data')}</div>
                ) : (
                    <div>
                        <h3 className="city">{zoneName}</h3>
                        <div>{dayStatus}</div>
                        <div className="hours">{offsetHours}</div>
                        <div className="date">
                            {offsetDate.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}
                        </div>
                        <button type="button" onClick={this.handleClick}>
                            {t('Remove region')}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default withNamespaces()(RegionTime);
