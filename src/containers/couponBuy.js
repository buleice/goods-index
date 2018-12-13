import {connect}  from 'react-redux';
import CouponBuy from '../components/couponBuy/couponBuy';
import {showCouponBuy,couponId} from "../actions";

const mapStateToProps = (state, ownProps) => ({
    couponBuyFilter: state.couponBuyFilter,
    showCouponBuy:state.showCouponBuy,
    userCoupons:state.userCoupons,
    buyMode:state.buyMode,
    groupId:state.groupId
})
const mapDispatchToProps = dispatch => ({
    setshowCouponBuy:isShow=>dispatch(showCouponBuy(isShow)),
    setCouponId:id=>dispatch(couponId(id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponBuy)
