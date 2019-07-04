import React from 'react'
import * as PropTypes from "prop-types";
import ButtonBase from '@material-ui/core/ButtonBase';
import {withStyles} from '@material-ui/core/styles'
import {changeNamespace} from "../socket-client/ChannelsHandler";
import {LocalStorage} from "../utils/LocalStorage"
import "../css/Channel.css"

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        width: 130,
        minWidth: 130,

    },
    image: {
        position: 'relative',
        height: 130,
        width: '100%',
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundPosition: "center 40%"
    },
    imageBackdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create("opacity")
    },

    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1) + 6}px`,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    nowPlaying: {
        position: "absolute",
        top: 5,
        left: 5,
        color: theme.palette.common.white,
        backgroundColor: 'rgba(0,0,0,.5)',
        padding: '5px 10px',
        borderRadius: '5%',
        textAlign:'center'
    },
    nowPlayingDot: {
        display: 'inline-block',
        height: 15,
        width: 15,
        backgroundColor: '#ff1744',
        borderRadius: '50%',
        animation: 'Blink infinite 2s',
    },

    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
})

class ChannelItem extends React.PureComponent {
    static propTypes = {
        channel: PropTypes.object.isRequired,
        updatePlayingStatus: PropTypes.func.isRequired,
        setStream: PropTypes.func.isRequired,
        setSong: PropTypes.func.isRequired,
    }

    handleClick = (channel_id, isPlaying) => {
        if (!isPlaying) {
            changeNamespace(channel_id, this.props.updatePlayingStatus,this.props.setStream,this.props.setSong)
            LocalStorage.set(LocalStorage.LAST_CHANNEL_ID, channel_id)
        }
    }

    render() {
        const {classes, channel} = this.props
        return (
            <div className={classes.root}>
                <ButtonBase focusRipple
                            key={channel.id}
                            className={classes.image}
                            focusVisibleClassName={classes.focusVisible}
                            onClick={() => this.handleClick(channel.id, channel.isPlaying)}>
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${channel.avatar_url})`,
                    }}/>
                    {channel.isPlaying && (
                        <div className={classes.nowPlaying}>
                            <span className={classes.nowPlayingDot}/>
                            <span>Now playing</span>
                        </div>
                    )}
                    <span className={!channel.isPlaying ? classes.imageBackdrop : ''}/>
                    <span className={classes.imageButton}>
                                <span className={classes.imageTitle}>
                                    {channel.listener_count}
                                    <span className={classes.imageMarked}/>
                                </span>
                    </span>
                </ButtonBase>
            </div>
        )
    }
}

export default withStyles(styles)(ChannelItem)