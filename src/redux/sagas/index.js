import { LOAD_TIME_ZONES, LOAD_TIME_ZONES_SUCCESS } from '../actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

const zonesApi = () => {
    return Axios.get(
        'http://api.timezonedb.com/v2.1/list-time-zone?key=UH8FYK83QQDI&format=json'
    )
        .then(response => response.data.zones)
        .catch(error => {
            throw error;
        });
};

function* loadTimeZones({ payload }) {
    try {
        const zones = yield call(zonesApi, payload);
        yield put({ type: LOAD_TIME_ZONES_SUCCESS, payload: zones });
    } catch (error) {
        throw error;
    }
}

function* mySaga() {
    yield takeLatest(LOAD_TIME_ZONES, loadTimeZones);
}

export default mySaga;
