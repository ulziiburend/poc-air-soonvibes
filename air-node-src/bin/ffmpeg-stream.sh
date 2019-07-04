#!/bin/bash
# this command combining the files and streaming to giving RTMP url

ffmpeg -re  -f concat -i $1  -c copy -f flv rtmp://localhost/live/channel-$2