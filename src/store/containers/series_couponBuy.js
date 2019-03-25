import {connect}  from 'react-redux';
import CouponBuy from '../../components/couponBuy/couponBuy';
import {couponBuyFilter, showCouponBuy} from "../actions";

const mapStateToProps = (state, ownProps) => ({
    couponBuyFilter: state.couponBuyFilter,
    showCouponBuy:state.showCouponBuy,
    userCoupons:state.userCoupons,
    carts: state.carts,
})
const mapDispatchToProps = dispatch => ({
    setshowCouponBuy:isShow=>dispatch(showCouponBuy(isShow))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponBuy)
