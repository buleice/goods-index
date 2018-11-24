import {connect}  from 'react-redux';
import { showGuide } from '../actions/index';
import Guize from '../components/guize/guize'
const mapStateToProps = (state, ownProps) => ({
    showStatus: state.showGuide
})

const mapDispatchToProps = dispatch => ({
    onGuizeClick: isShowGuide => dispatch(showGuide(isShowGuide))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Guize)
