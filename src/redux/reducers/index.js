import { ADD_REGION, LOAD_TIME_ZONES_SUCCESS } from '../actionTypes';

const initialState = {
    selectedZones: []
};

const visibilityFilter = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REGION: {
            return {
                ...state,
                selectedZones: state.selectedZones.concat(action.payload)
            };
        }
        case LOAD_TIME_ZONES_SUCCESS:
            console.log({
                ...state,
                zones: action.payload
            });
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
