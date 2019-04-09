import {connect}  from 'react-redux';
import InvitePage from '../../../view/invite'
import {pageData,SetTm,freeBuy,cantuanPrice,userCoupons,groupId} from "../../actions";

const mapDispatchToProps = dispatch => ({
    setPageData:data=>dispatch(pageData(data)),
    setFreeBuy:isFree=>dispatch(freeBuy(isFree)),
    setUserCoupons:coupons=>dispatch(userCoupons(coupons)),
    setCantuanPrice:price=>dispatch(cantuanPrice(price)),
    setTm: tm => dispatch(SetTm(tm)),
    setGroupId: id => dispatch(groupId(id))
})
const mapStateToProps = (state, ownProps) => ({
    modalOpen: state.modalOpen,
    couponid: state.couponId,
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvitePage)
