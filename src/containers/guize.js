import {connect} from 'react-redux';
import {showGuide,modalOpen} from '../actions/index';
import Guize from '../components/guize/guize'

const mapStateToProps = (state, ownProps) => ({
    showStatus: state.showGuide
})

const mapDispatchToProps = dispatch => ({
    onGuizeClick: isShowGuide => dispatch(showGuide(isShowGuide)),
    setModalOpen: modalopen => dispatch(modalOpen(modalopen))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Guize)
