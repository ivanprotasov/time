// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { Button } from 'reactstrap';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

type Props = {
    disabled?: boolean
};

class App extends Component<Props> {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink to="/world-time">World time</NavLink>
                    </li>
                    <li>
                        <NavLink to="/alarm">Alarm</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sleeping-mode">Sleeping mode</NavLink>
                    </li>
                    <li>
                        <NavLink to="/stopwatch">Stopwatch</NavLink>
                    </li>
                    <li>
                        <NavLink to="/timer">Timer</NavLink>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route path="/world-time" component={WorldTime} />
                    <Route path="/sleeping-mode" component={SleepingMode} />
                    <Route path="/stopwatch" component={Stopwatch} />
                    <Route path="/timer" component={Timer} />
                    <Route path="/alarm" component={Alarm} />
                    <Route render={() => <Redirect to="/alarm" />} />
                </Switch>

                {/*<div className={styles['App']}>*/}
                {/*<header className={styles['App-header']}>*/}
                {/*<img*/}
                {/*src={logo}*/}
                {/*className={styles['App-logo']}*/}
                {/*alt="logo"*/}
                {/*/>*/}
                {/*<p>Saved1</p>*/}
                {/*<a*/}
                {/*className={styles['App-link']}*/}
                {/*href="https://reactjs.org"*/}
                {/*target="_blank"*/}
                {/*rel="noopener noreferrer">*/}
                {/*Learn React*/}
                {/*</a>*/}
                {/*<Button>Click</Button>*/}
                {/*</header>*/}
                {/*</div>*/}
            </div>
        );
    }
}

function WorldTime() {
    return (
        <div>
            <h2>World time</h2>
        </div>
    );
}

function Alarm() {
    return (
        <div>
            <h2>Alarm</h2>
        </div>
    );
}

function SleepingMode() {
    return (
        <div>
            <h2>Sleeping mode</h2>
        </div>
    );
}

function Stopwatch() {
    return (
        <div>
            <h2>Stopwatch</h2>
        </div>
    );
}

function Timer() {
    return (
        <div>
            <h2>Timer</h2>
        </div>
    );
}

export default App;
