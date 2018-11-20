import React, { Component } from 'react';

class CityTime extends Component {
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
        this.setState({
            date: new Date()
        });
    }

    render() {
        let offsetMilliseconds =
                this.state.date.getTimezoneOffset() * 1000 * 60 +
                this.props.gmtOffset * 1000,
            offsetHours = offsetMilliseconds / 3600000,
            offsetDate = new Date(
                this.state.date.getTime() + offsetMilliseconds
            ),
            offsetDateHours = offsetDate.getHours(),
            currentDateHours = this.state.date.getHours(),
            dayStatus;

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
                <div>
                    <div className="delta">{this.props.gmtOffset}</div>
                    <div className="city">{this.props.zoneName}</div>
                    <div className="date">
                        {this.state.date.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                    <div className="date">
                        {offsetDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                    <div className="hours">{offsetHours}</div>
                    <div className="hours">{currentDateHours}</div>
                    <div className="hours">{offsetDateHours}</div>
                    <div>{dayStatus}</div>
                </div>
            </div>
        );
    }
}

export default CityTime;
