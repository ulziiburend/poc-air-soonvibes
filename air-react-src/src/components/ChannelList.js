import React from 'react'
import * as PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles'
import ChannelItem from './ChannelItem'
import {getRequest} from "../utils/ApiServices";
import {channelMain, changeNamespace} from "../socket-client/ChannelsHandler";
import {LocalStorage} from "../utils/LocalStorage"

const styles = theme => ({
    root:{
        display:'inline-flex',
        overflowX:'scroll',
    }
})
class ChannelList extends React.PureComponent {
    constructor(props){
        super(props)
        channelMain(props.actions.updateListenerCount)
    }
    componentDidMount() {
        const {addAll,updatePlayingStatus} = this.props.actions
        const {setStream,setSong} = this.props
        const params = {
            category: 'fan',
            is_verified: true,
        }
        const last_channel_id = LocalStorage.get(LocalStorage.LAST_CHANNEL_ID)
        getRequest('/api/v1/channels/', params).then(function (response) {
            //redux add channel data
            addAll(response.data)
            // socket section
            // listen updates of listener
            // select initial channel based LocalStorage if exists
            const lastChannelId =last_channel_id ? last_channel_id : 2
            //the channel socket connection
            changeNamespace(lastChannelId,updatePlayingStatus,setStream,setSong)
        })
    }

    render() {
        const {classes,availableChannels} = this.props
        const {updatePlayingStatus} = this.props.actions
        const {setStream,setSong} = this.props
        return (
            <div className={classes.root}>
                {availableChannels.map(channel =>
                    <ChannelItem key={channel.id} channel={channel} updatePlayingStatus={updatePlayingStatus}  setStream={setStream} setSong={setSong}  />
                )}
            </div>
        )
    }
}

ChannelList.propTypes = {
    availableChannels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        listener_count: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    actions: PropTypes.object.isRequired,
    setStream: PropTypes.func.isRequired,
    setSong: PropTypes.func.isRequired,
}

export default withStyles(styles)(ChannelList)
