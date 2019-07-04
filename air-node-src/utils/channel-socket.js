const stream = require('./music-stream');
let clientsCount = {};
let mIO;

function increaseCount(channel_id) {
    let count = clientsCount['' + channel_id] ? clientsCount['' + channel_id] + 1 : 1;
    clientsCount['' + channel_id] = count;
    return count;
}

function decreaseCount(channel_id) {
    let count = clientsCount['' + channel_id] ? clientsCount['' + channel_id] - 1 : 0;
    clientsCount['' + channel_id] = count;
    return count;
}

module.exports.handler = function (io) {
    // handle events for channels namespaces
    mIO = io
    io.of(/^\/channel-\d+$/).on('connect', (channelSocket) => {
        console.log('Client has connected to channel');
        const channel_id = parseInt(channelSocket.nsp.name.toString().split("-")[1], 10);
        // broadcast to all clients about changes of listener-counts
        io.emit('listener-counts', {
                //on connect notify clients number of connections
                channel_id: channel_id,
                count: increaseCount(channel_id)
            }
        );
        channelSocket.on("disconnect", () => {
            // on disconnect notify clients number of connections
            io.emit('listener-counts', {
                    channel_id: channel_id,
                    count: decreaseCount(channel_id)
                }
            );
        });
        //its called by React socket ChannelsHandler.js method changeNamespace
        channelSocket.on('stream-data', function (data, callback) {
            // promise details of stream and song from related channel
            callback(stream.getStreamChannel(data.channel_id));
        });
    });
};

module.exports.emitSongChannel = function (channel_id, song) {
    if (mIO)
        mIO.of('channel-' + channel_id).emit('song-data', song);
}