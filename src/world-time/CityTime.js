import React, { Component } from 'react';

class CityTime extends Component {
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
        this.setState({
            date: new Date()
        });
    }

    handleClick() {
        this.props.onRemove(this.props.zoneName);
    }

    render() {
        const date = this.state.date,
            { gmtOffset, zoneName } = this.props,
            offsetMilliseconds =
                date.getTimezoneOffset() * 1000 * 60 + gmtOffset * 1000,
            offsetHours = offsetMilliseconds / 3600000,
            offsetDate = new Date(date.getTime() + offsetMilliseconds),
            offsetDateHours = offsetDate.getHours(),
            currentDateHours = date.getHours();

        let dayStatus;

        if (offsetMilliseconds < 0 && offsetDateHours > currentDateHours) {
            dayStatus = <div>Yesterday</div>;
        } else if (
            offsetMilliseconds > 0 &&
            offsetDateHours < currentDateHours
        ) {
            dayStatus = <div>Tomorrow</div>;
        } else {
            dayStatus = <div>Today</div>;
        }

        return (
            <div>
                {zoneName === '' ? (
                    <div>Please, select time zone</div>
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
                            Remove country
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default CityTime;
