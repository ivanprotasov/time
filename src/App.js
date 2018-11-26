// @flow

import React, { Component } from 'react';
import i18n from './i18n/i18n';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import WorldTime from './world-time/WorldTime.js';

type Props = {
    disabled?: boolean
};

class App extends Component<Props> {
    render() {
        const { t } = this.props;
        const changeLanguage = lng => {
            i18n.changeLanguage(lng);
        };
        return (
            <div>
                <div>
                    <button onClick={() => changeLanguage('ru')}>ru</button>
                    <button onClick={() => changeLanguage('en')}>en</button>
                </div>
                <ul>
                    <li>
                        <NavLink to="/world-time">{t('World time')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/alarm">{t('Alarm')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sleeping-mode">
                            {t('Sleeping mode')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/stopwatch">{t('Stopwatch')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/timer">{t('Timer')}</NavLink>
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
