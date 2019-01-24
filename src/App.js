// @flow
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import i18n from './i18n/i18n';

import WorldTime from './world-time/world-time/WorldTime.js';

type Props = {
    disabled?: boolean,
    t: any
};

class App extends Component<Props> {
    render() {
        const { t } = this.props;
        const changeLanguage = lng => {
            i18n.changeLanguage(lng);
        };
        return (
            <div className="container">
                <ul className="nav">
                    <li className="nav-item">
                        <button
                            className="btn btn-link nav-link"
                            onClick={() => changeLanguage('ru')}>
                            ru
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-link nav-link"
                            onClick={() => changeLanguage('en')}>
                            en
                        </button>
                    </li>
                </ul>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/world-time">
                            {t('World time')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/alarm">
                            {t('Alarm')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/sleeping-mode">
                            {t('Sleeping mode')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/stopwatch">
                            {t('Stopwatch')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/timer">
                            {t('Timer')}
                        </NavLink>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route path="/world-time" component={WorldTime} />
                    <Route
                        path="/sleeping-mode"
                        component={withNamespaces()(SleepingMode)}
                    />
                    <Route
                        path="/stopwatch"
                        component={withNamespaces()(Stopwatch)}
                    />
                    <Route path="/timer" component={withNamespaces()(Timer)} />
                    <Route path="/alarm" component={withNamespaces()(Alarm)} />
                    <Route render={() => <Redirect to="/alarm" />} />
                </Switch>
            </div>
        );
    }
}

function Alarm({ t }) {
    return (
        <div>
            <h2>{t('Alarm')}</h2>
        </div>
    );
}

function SleepingMode({ t }) {
    return (
        <div>
            <h2>{t('Sleeping mode')}</h2>
        </div>
    );
}

function Stopwatch({ t }) {
    return (
        <div>
            <h2>{t('Stopwatch')}</h2>
        </div>
    );
}

function Timer({ t }) {
    return (
        <div>
            <h2>{t('Timer')}</h2>
        </div>
    );
}

export default withNamespaces()(App);
