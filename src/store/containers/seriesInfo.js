import {connect}  from 'react-redux';
import Series from '../../components/series/series'
import {setCarts,modalOpen,totalPrice} from "../actions";
const mapStateToProps=(state,ownProps)=>({
     pageData:state.pageData
})
const mapDispatchToProps = (dispatch,ownProps)=> ({
    setCarts: newvalue => dispatch(setCarts(newvalue)),
    setModalOpen:modalopen=>dispatch(modalOpen(modalopen)),
    calTotalPrice:totalprice=>dispatch(totalPrice(totalprice))
})


export default connect(
  mapStateToProps,
    mapDispatchToProps
)(Series)
