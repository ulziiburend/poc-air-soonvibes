import {connect} from 'react-redux'
import SongDetail from "../../components/SongDetail";

const mapStateToProps = state => ({
    song: state.song,
})

const SongDetailContainer = connect(
    mapStateToProps,
)(SongDetail)

export default SongDetailContainer
