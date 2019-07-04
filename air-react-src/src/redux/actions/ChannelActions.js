import * as types from '../constants/ChannelActionTypes'

export const addAll = channels => ({ type: types.ADD_ALL, channels })
export const updateListenerCount = (channel_id,count )=> ({ type: types.UPDATE_LISTENER_COUNT, channel_id,count })
export const updatePlayingStatus= (channel_id,status )=> ({ type: types.UPDATE_PLAYING_STATUS, channel_id,status })
