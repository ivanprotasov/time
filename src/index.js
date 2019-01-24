import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n/i18n';
import App from './App';

import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './redux/store';
import mySaga from './redux/sagas';

sagaMiddleware.run(mySaga);
Modal.setAppElement(document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
