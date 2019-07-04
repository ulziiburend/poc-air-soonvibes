import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ChannelActions from '../actions/ChannelActions'
import {setStream} from '../actions/StreamActions'
import {setSong} from '../actions/SongActions'
import ChannelList from '../../components/ChannelList'
import {getAvailableChannels} from '../selectors/ChannelSelector'

const mapStateToProps = state => ({
    availableChannels: getAvailableChannels(state),
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ChannelActions, dispatch),
    setStream: stream => dispatch(setStream(stream)),
    setSong: song => dispatch(setSong(song)),
})

const AvailableChannelList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelList)

export default AvailableChannelList
