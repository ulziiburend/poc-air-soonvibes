import React from 'react'
import * as PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
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

})



class SongDetail extends React.PureComponent {

    render() {
        const {classes, song, showDetail} = this.props
        return (
            <div className={classes.songDetail + ' ' + (!showDetail ? classes.blurred : '')}>
                {song && (
                    <div>
                        <img src={song.cover_url} className={classes.cover_img} alt={song.name}/>
                        <h2>{song.name}</h2>
                        <h3>{song.artist}</h3>
                    </div>
                )
                }
            </div>
        )
    }
}

SongDetail.propTypes = {
    song: PropTypes.object.isRequired,
    showDetail: PropTypes.bool.isRequired
}

export default withStyles(styles)(SongDetail)
