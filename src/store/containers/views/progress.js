import {connect}  from 'react-redux';
import ProgressPage from '../../../view/progress'
import {pageData,SetTm} from "../../actions";

const mapDispatchToProps = dispatch => ({
    setPageData:data=>dispatch(pageData(data)),
    setTm: tm => dispatch(SetTm(tm))
})
const mapStateToProps = (state, ownProps) => ({
    modalOpen: state.modalOpen,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressPage)
