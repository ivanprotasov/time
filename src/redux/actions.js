import {
    ADD_TIME_ZONE,
    LOAD_TIME_ZONES,
    REMOVE_TIME_ZONE
} from './actionTypes';

let nextRegionId = -1;

export const addTimeZone = content => ({
    type: ADD_TIME_ZONE,
    payload: {
        id: ++nextRegionId,
        content
    }
});

export const removeTimeZone = regionID => ({
    type: REMOVE_TIME_ZONE,
    payload: regionID
});

export const loadTimeZones = () => ({
    type: LOAD_TIME_ZONES
});
