import {connect} from 'react-redux'
import MainPlayer from '../../components/MainPlayer'
const mapStateToProps = state => ({
    stream: state.stream,
})

const MainPlayerContainer = connect(
    mapStateToProps,
)(MainPlayer)

export default MainPlayerContainer
