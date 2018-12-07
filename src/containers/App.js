import {connect}  from 'react-redux';
import App from '../App'
import {freeBuy, groupData, SetTm} from "../actions";

const mapDispatchToProps = dispatch => ({
    setTm: tm => dispatch(SetTm(tm)),
    setGroups: data => dispatch(groupData(data)),
    setFreeBuy:isFree=>dispatch(freeBuy(isFree))
})
const mapStateToProps = (state, ownProps) => ({
    modalOpen: state.modalOpen,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
