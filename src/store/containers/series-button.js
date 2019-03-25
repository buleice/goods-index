import {connect}  from 'react-redux';
import FooterButtons from '../../components/buttons/buttons'
import {couponBuyFilter, showCouponBuy,pageData} from "../actions";
const mapStateToProps = (state, ownProps) => ({
    carts: state.carts,
    totalPrice:state.totalPrice,
    couponBuyFilter: state.couponBuyFilter,
    showCouponBuy:state.showCouponBuy,
    userCoupons:state.userCoupons,
    pageData:state.pageData
})
const mapDispatchToProps = dispatch => ({
    setCouponBuyFilter:condition=>dispatch(couponBuyFilter(condition)),
    setshowCouponBuy:isShow=>dispatch(showCouponBuy(isShow)),
    setPageData:data=>dispatch(pageData(data)),
     setPageData:data=>dispatch(pageData(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterButtons)
