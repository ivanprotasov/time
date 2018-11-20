import React, { Component } from 'react';

function CityTime(props) {
    return (
        <div>
            <div>
                <span className="delta">{props.gmtOffset}</span>
                <span className="city">{props.zoneName}</span>
            </div>
            <div>
                <span className="time" />
            </div>
        </div>
    );
}

export default CityTime;
