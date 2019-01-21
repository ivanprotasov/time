import { ADD_REGION, LOAD_TIME_ZONES } from './actionTypes';

let nextRegionId = -1;

export const addRegion = content => ({
    type: ADD_REGION,
    payload: {
        id: ++nextRegionId,
        content
    }
});

export const loadTimeZones = () => ({
    type: LOAD_TIME_ZONES
});
