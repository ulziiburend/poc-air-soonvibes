import React from 'react'

import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
    root:{
          position:'absolute'
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

function Reaction ({reaction}) {
        return (
            <div className={classes.root}>
                    <Fab color="primary" aria-label="fa-heart" className={classes.fab + ' ' + classes.heart}>
                        <i className="fas fa-heart"></i>
                    </Fab>
            </div>
        )
}

export default withStyles(styles)(Reaction)
