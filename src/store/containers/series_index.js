import {connect}  from 'react-redux';
import App from '../../App'
import {userCoupons,pageData} from "../actions";
const mapDispatchToProps = dispatch => ({
    setUserCoupons:coupons=>dispatch(userCoupons(coupons)),
     setPageData:data=>dispatch(pageData(data))
})
const mapStateToProps = (state, ownProps) => ({
    userCoupons:state.userCoupons,
      pageData:state.pageData
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
