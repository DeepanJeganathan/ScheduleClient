
import { FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_FAIL, FETCH_SCHEDULES_REQUEST, POST_FAIL, POST_SUCCESS, REMOVE_SCHEDULE, EDIT } from "./scheduleTypes"

const initialState = {
    loading: false,
    data: [],
    error: '',
    post_success: false,
    post_fail: ''
}


const scheduleReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_SCHEDULES_REQUEST:
            return { ...state, loading: true }
        case FETCH_SCHEDULES_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: '' }
        case FETCH_SCHEDULES_FAIL:
            return { ...state, data: [], loading: false, error: action.payload }
        //fix this to return obj and add to state on client side
        case POST_SUCCESS:
            return { ...state, post_success: true }
        case POST_FAIL:
            return { ...state, post_fail: action.payload }
        case EDIT:
            return {
                ...state.data.map(x => {
                    if (x.scheduleId === action.payload.id)
                    {
                        return { x: action.payload }
                    }
                    return x
                })
            }
        case REMOVE_SCHEDULE:
            state.data.filter(x => x.scheduleId !== action.payload);
            return { ...state, error: '' }
        default:
            return state;

    }

}

export default scheduleReducer