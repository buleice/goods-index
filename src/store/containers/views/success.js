import {connect}  from 'react-redux';
import ProgressPage from '../../../view/success'
import {pageData} from "../../actions";

const mapDispatchToProps = dispatch => ({
    setPageData:data=>dispatch(pageData(data))
})
const mapStateToProps = (state, ownProps) => ({
    modalOpen: state.modalOpen,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressPage)
