import {
    ADD_TIME_ZONE,
    LOAD_TIME_ZONES_SUCCESS,
    REMOVE_TIME_ZONE
} from '../actionTypes';

const initialState = {
    selectedTimeZones: []
};

const visibilityFilter = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TIME_ZONE: {
            return {
                ...state,
                selectedTimeZones: state.selectedTimeZones.concat(
                    action.payload
                )
            };
        }
        case REMOVE_TIME_ZONE: {
            return {
                ...state,
                selectedTimeZones: state.selectedTimeZones.filter(
                    zone => zone.id !== action.payload
                )
            };
        }
        case LOAD_TIME_ZONES_SUCCESS:
            return {
                ...state,
                zones: action.payload
            };
        default: {
            return state;
        }
    }
};

export default visibilityFilter;
