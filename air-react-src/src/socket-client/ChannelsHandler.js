import io from "socket.io-client"
import {MAIN_URL,CHANNEL_NAMESPACE} from './Constants'

let lastConnectedChannel = null

export function channelMain(updateListenerCount) {
    const socket = io(MAIN_URL)
    socket.on('listener-counts', function (data) {
        console.log('listener-counts',data);
        updateListenerCount(data.channel_id, data.count)
    })
}

export function changeNamespace(channel_id, updatePlayingStatus,setStream,setSong) {
    if (lastConnectedChannel) {
        console.log('lastConnectedChannel','yes')
        const lastChannelId = parseInt(lastConnectedChannel.nsp.toString().split("-")[1],10)
        lastConnectedChannel.close()
        updatePlayingStatus(lastChannelId,false)
    }
    const socket = io(MAIN_URL + CHANNEL_NAMESPACE + channel_id)
    socket.on('connect', function () {
        updatePlayingStatus(channel_id,true)
        lastConnectedChannel = socket
        socket.emit('stream-data', {channel_id:channel_id}, function(data){
            console.log(data.url)
            setStream(data.url)
            setSong(data.song)
        });
        socket.on('song-data',function (data) {
            console.log('song-data',data)
            setSong(data)
        })
        console.log('client playing channel' +channel_id)
    })
}
