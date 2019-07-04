import React from 'react'
import flvjs from 'flv.js'
import * as PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import SongDetailContainer from "../redux/containers/SongDetailContainer";

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    songDetail: {
        textAlign: 'center',
        minWidth: 250,
        minHeight: 250,
    },
    cover_img: {
        maxWidth: 250,
        borderRadius: '10px',
    },
    blurred: {
        filter: 'blur(5px)',
    },
    hiddenPlayer: {
        display: 'none',
    },
    chip: {
        margin: theme.spacing(1),
    },
    fab: {
        margin: theme.spacing(1),

    },
    heart: {
        backgroundColor: "white",
        color: '#e91e63'
    },
    fire: {
        backgroundColor: "black",
        color: '#e91e63'
    }
})

let flvPlayer = null

class MainPlayer extends React.Component {
    state = {
        showDetail: false,
    }

    shouldComponentUpdate(nextProps) {
        const {url} = nextProps.stream
        const previousUrl = this.props.stream.url
        const video = this.player;
        // to not update the player when song changes
        if (flvjs.isSupported() && previousUrl !== url) {
            if (flvPlayer)
                flvPlayer.destroy()
            flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: url
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
            flvPlayer.play();
        }
        return true
    }

    render() {
        const {classes} = this.props
        console.log(this.props)
        const {showDetail,} = this.state
        return (
            <div className={classes.root}>
                <video className={classes.hiddenPlayer}
                       ref={player => (this.player = player)}
                />
                <SongDetailContainer showDetail={showDetail}/>

                <Box display="flex" justifyContent="center" spacing={2}>
                    <Fab color="primary" aria-label="fa-heart" className={classes.fab + ' ' + classes.heart}>
                        <i className="fas fa-heart"></i>
                    </Fab>
                    <Fab color="primary" aria-label="fa-fire" className={classes.fab + ' ' + classes.fire}>
                        <i className="fas fa-fire"></i>
                    </Fab>
                    <Fab color="primary" aria-label="fa-fire" className={classes.fab + ' ' + classes.fire}>
                        <i className="fas fa-fire"></i>
                    </Fab>
                </Box>
                <Chip
                    label="If you want to see the artist click one of these reactions"
                    icon={<i className="fas fa-eye"></i>}
                    className={classes.chip}
                    variant="outlined"
                />
            </div>
        )
    }
}

//
MainPlayer.propTypes = {
    stream: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainPlayer)
