import {connect}  from 'react-redux';
import BuyButtons from '../../components/buy-buttons/buy-buttons';
import {couponBuyFilter, showCouponBuy,buyMode} from "../actions";
const mapStateToProps = (state, ownProps) => ({
    couponBuyFilter: state.couponBuyFilter,
    showCouponBuy:state.showCouponBuy,
    userCoupons:state.userCoupons,
})
const mapDispatchToProps = dispatch => ({
    setCouponBuyFilter:condition=>dispatch(couponBuyFilter(condition)),
    setshowCouponBuy:isShow=>dispatch(showCouponBuy(isShow)),
    setBuyMode:mode=>dispatch(buyMode(mode))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyButtons)
