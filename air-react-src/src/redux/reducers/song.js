import {
    SET_SONG,
} from '../constants/SongActionTypes'

export default function song(state = {}, action) {
    switch (action.type) {
        case SET_SONG:
            return {...state , ...action.song}
        default:
            return state
    }
}
