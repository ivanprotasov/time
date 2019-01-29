// @flow
import React, { Suspense, lazy, PureComponent } from 'react';
import { withNamespaces } from 'react-i18next';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import ThemeSwitcher from './components/common/theme-switcher/ThemeSwitcher';
import LanguageSwitcher from './components/common/language-switcher/LanguageSwitcher';
import { ThemeContext } from './components/common/theme-store/ThemeStore';
import styles from './App.module.scss';

type Props = {
    disabled?: boolean,
    t: any
};

const WorldTime = lazy(() =>
    import('./components/world-time/world-time/WorldTime.js')
);

class App extends PureComponent<Props> {
    static contextType = ThemeContext;

    render() {
        const { t } = this.props;
        return (
            <div
                className={[
                    'container w100',
                    styles['App-container'],
                    styles[`App-${this.context.theme}-theme`]
                ].join(' ')}>
                <ThemeSwitcher />
                <LanguageSwitcher />
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route
                            path="/world-time"
                            component={props => <WorldTime {...props} />}
                        />
                        <Route
                            path="/sleeping-mode"
                            component={withNamespaces()(SleepingMode)}
                        />
                        <Route
                            path="/stopwatch"
                            component={withNamespaces()(Stopwatch)}
                        />
                        <Route
                            path="/timer"
                            component={withNamespaces()(Timer)}
                        />
                        <Route
                            path="/alarm"
                            component={withNamespaces()(Alarm)}
                        />
                        <Route render={() => <Redirect to="/alarm" />} />
                    </Switch>
                </Suspense>
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
