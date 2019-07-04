const fs = require('fs');
const {exec} = require('child_process');
const Promise = require('bluebird');
const schedule = require('node-schedule')
const socket = require('./channel-socket');
const {CHANNELS_PLAYLIST_DIR, FFMPEG_FILE_REG, FLV_FILE_EXT, FLV_URL,SERVER_DELAY} = require('./Constants');
const channels = require('./DUMMY_CHANNEL_LIST');

const currentChannelSongs = {};

// creating a new file for ffmpeg channel playlist
function makePlaylist(channel_id, songs) {
    const filePath = CHANNELS_PLAYLIST_DIR + channel_id + "-playlist.txt";
    songs.forEach(function (song) {
        fs.appendFile(filePath, FFMPEG_FILE_REG + song.url + "'\n", function (err) {
            if (err) throw err;

        });
    });
    createSongTimer(channel_id, 0);
    return filePath;
}

function createSongTimer(channel_id, index) {
    const song = channels[channel_id][index]
    currentChannelSongs[channel_id] = song;
    //adding server delay because streaming has delay
    schedule.scheduleJob(Date.now() + (song.duration * 1000)+SERVER_DELAY, function () {
        const nextIndex = getNextSongIndex(channel_id, index);
        socket.emitSongChannel(channel_id, song);
        createSongTimer(channel_id, nextIndex);

    });

}

function getNextSongIndex(channel_id, index) {
    if (index > channels[channel_id].length) {
        return 0
    } else
        return index + 1
}

function deleteOldPlaylistFiles(directory) {
    return new Promise(function (resolve, reject) {
        const deleteExec = exec(`./bin/delete_old_playlist.sh  ${directory}`);
        deleteExec.addListener("error", reject);
        deleteExec.addListener("exit", resolve);
    })
}


function createFFMPEGStream(channel_id, playlist) {
    // run ffmpeg command to create a stream
    exec(`./bin/ffmpeg-stream.sh  ${playlist} ${channel_id}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`./bin/ffmpeg-stream.sh: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

}

function createStreamChannels(channels) {
    for (const channel_id in channels) {
        const playlistPath = makePlaylist(channel_id, channels[channel_id]);
        createFFMPEGStream(channel_id, playlistPath)
    }
}

module.exports.startStream = function () {
    // since every time we need update the playlist then we deleting old files
    deleteOldPlaylistFiles(CHANNELS_PLAYLIST_DIR).then(function (result) {
        console.log('deleteOldPlaylistFiles ->promise success: true');
        //for each channel we need separate live streams
        createStreamChannels(channels)
    }, function (err) {
        console.log('deleteOldPlaylistFiles -> promise rejected: ' + err);
    });

};

module.exports.getStreamChannel = function (channel_id) {
    const data = {
        url: FLV_URL + channel_id + FLV_FILE_EXT,
        song: currentChannelSongs[channel_id]
    };
    return data
};