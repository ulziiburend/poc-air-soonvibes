import {
    NEW_REACTION,
} from '../constants/ReactionActionTypes'

export default function reaction(state = {}, action) {
    switch (action.type) {
        case NEW_REACTION:
            return {...state , ...action.reaction}
        default:
            return state
    }
}
