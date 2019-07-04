import {connect} from 'react-redux'
import ReactionHadler from '../../components/ReactionHadler'
import {getCurrentChannel} from '../selectors/ChannelSelector'
const mapStateToProps = state => ({
    channel_id: state.song,
})



const ReactionHadler = connect(
    mapStateToProps,
)(ReactionHadler)

export default ReactionHadler
