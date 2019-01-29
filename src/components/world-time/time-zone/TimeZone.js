import React, { PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';

import styles from './TimeZone.module.scss';
import { ThemeContext } from '../../common/theme-store/ThemeStore';

class TimeZone extends PureComponent {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
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

    handleClick = () => {
        this.props.onRemove(this.props.zoneID, this.props.zoneName);
    };

    render() {
        const date = this.state.date,
            { gmtOffset, zoneName, t } = this.props,
            offsetMilliseconds =
                date.getTimezoneOffset() * 1000 * 60 + gmtOffset * 1000,
            offsetHours = offsetMilliseconds / 3600000,
            offsetDate = new Date(date.getTime() + offsetMilliseconds),
            offsetDateHours = offsetDate.getHours(),
            currentDateHours = date.getHours();

        let dayStatus,
            offsetHoursString =
                offsetHours >= 0 ? '+' + offsetHours : offsetHours;

        if (offsetMilliseconds < 0 && offsetDateHours > currentDateHours) {
            dayStatus = <span>{t('Yesterday')}</span>;
        } else if (
            offsetMilliseconds > 0 &&
            offsetDateHours < currentDateHours
        ) {
            dayStatus = <span>{t('Tomorrow')}</span>;
        } else {
            dayStatus = <span>{t('Today')}</span>;
        }
        return (
            <li
                className={[
                    'list-group-item',
                    styles[`TimeZone-${this.context.theme}-theme`]
                ].join(' ')}>
                <div className="container">
                    {zoneName === '' ? (
                        <div>{t('Sorry, wrong region data')}</div>
                    ) : (
                        <div className="row">
                            <div className="col-sm">
                                <div>
                                    {dayStatus},&nbsp;{offsetHoursString}
                                    {t('hh')}
                                </div>
                                <h3 className="city">{zoneName}</h3>
                            </div>
                            <div className="col-sm">
                                <div className={styles.TimeZone}>
                                    {offsetDate.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={this.handleClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )}
                </div>
            </li>
        );
    }
}

export default withNamespaces()(TimeZone);
