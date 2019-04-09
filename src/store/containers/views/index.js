import { withRouter } from 'react-router-dom'
import {connect}  from 'react-redux';
import IndexPage from '../../../view/index'
import {freeBuy, groupData, SetTm,userCoupons,cantuanPrice,pageData} from "../../actions";

const mapDispatchToProps = dispatch => ({
    setTm: tm => dispatch(SetTm(tm)),
    setGroups: data => dispatch(groupData(data)),
    setFreeBuy:isFree=>dispatch(freeBuy(isFree)),
    setUserCoupons:coupons=>dispatch(userCoupons(coupons)),
    setCantuanPrice:price=>dispatch(cantuanPrice(price)),
    setPageData:data=>dispatch(pageData(data))
})
const mapStateToProps = (state, ownProps) => ({
    modalOpen: state.modalOpen,
})
// export default connect(mapStateToProps,mapDispatchToProps)(IndexPage)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(IndexPage))
