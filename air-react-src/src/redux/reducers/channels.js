import {
    ADD_ALL,
    UPDATE_LISTENER_COUNT, UPDATE_PLAYING_STATUS
} from '../constants/ChannelActionTypes'

export default function channels(state = [], action) {
    switch (action.type) {
        case ADD_ALL:
            // action.channels will be array of channels
            let channelsList = action.channels.map(channel => {
                return {...channel, listener_count: 0 ,isPlaying:false}
                })
            return channelsList

        case UPDATE_LISTENER_COUNT:
            return state.map(channel =>
                channel.id === action.channel_id ?
                    { ...channel, listener_count: action.count} :
                    channel
            )
        case UPDATE_PLAYING_STATUS:
            return state.map(channel =>
                channel.id === action.channel_id ?
                    { ...channel, isPlaying: action.status} :
                    channel
            )

        default:
            return state
    }
}
