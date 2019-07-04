import {combineReducers} from 'redux'
import channels from './channels'
import song from './song'
import reaction from './reaction'
import stream from './stream'

const rootReducer = combineReducers({
    channels,
    song,
    stream,
    reaction
})
export default rootReducer
