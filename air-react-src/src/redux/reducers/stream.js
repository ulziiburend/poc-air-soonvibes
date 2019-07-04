import {
    SET_STREAM,
} from '../constants/StreamActionTypes'

export default function stream(state = {}, action) {
    switch (action.type) {
        case SET_STREAM:
            return {...state ,url: action.url}
        default:
            return state
    }
}
