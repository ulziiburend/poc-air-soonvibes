import {connect} from 'react-redux'
import Chat from "../../components/Chat";
import {getCurrentChannel} from '../selectors/ChannelSelector'
const mapStateToProps = state => ({
    channel: getCurrentChannel(state),
})

const ChatContainer = connect(
    mapStateToProps,
)(Chat)

export default ChatContainer
