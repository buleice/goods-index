import React,{Component} from 'react';
import './single-group.scss';
import { connect } from 'react-redux';
import {backTimeString} from '../../common/js/process'
import {wxPays} from "../../common/js/wxpay";
import {couponBuyFilter, showCouponBuy, buyMode, groupId, showMoreGroup} from "../../actions";

const mapStateToProps = (state, props) => ({
    tm: state.tm,
    freeBuy:state.freeBuy,
    userCoupons:state.userCoupons,
    cantuanPrice:state.cantuanPrice,
    couponid:state.couponId
})
const mapDispatchToProps = dispatch => ({
    setCouponBuyFilter:condition=>dispatch(couponBuyFilter(condition)),
    setshowCouponBuy:isShow=>dispatch(showCouponBuy(isShow)),
    setBuyMode:mode=>dispatch(buyMode(mode)),
    setGroupId:id=>dispatch(groupId(id)),
    onShowMoreGroupClick: isShowMoreGroup => dispatch(showMoreGroup(isShowMoreGroup)),
})
class SingleGroup extends Component{
    constructor(props){
        super(props);
        this.state={
            endTime:props.item.endTime,
            remainTime:'',
            canClick: true
        }
        this._GetQueryString = this._GetQueryString.bind(this)
    }
    componentDidMount(){
        let endTime=this.state.endTime;
        let _this=this;
        let tm=this.props.tm;
        let timeloop=setInterval(function () {
            if(backTimeString(endTime,tm)!==0){
                _this.setState({
                    remainTime :backTimeString(endTime,tm)
                })
                tm++;
            }else{
                clearInterval(timeloop);
                window.location.reload();
            }
        },1000)
    }
    processPay(groupid){
        let isFree=this.props.freeBuy;
        let buyingid= this._GetQueryString('id');
        if (this.state.canClick) {
            this.props.setGroupId(groupid);
            this.props.setBuyMode(0);
            this.props.onShowMoreGroupClick(false)
            this.setState({
                canClick: false
            })
            if(isFree){
                wxPays.freeJoin('/groupbuying/freejoin.json',{buyingid:buyingid,groupid:groupid});
            }else {
                let filteredCoupons=this.props.userCoupons.filter(item=>{
                    return this.props.cantuanPrice>=item.spendMoney
                });
                if(filteredCoupons.length>0){
                    this.props.setshowCouponBuy(true);
                    this.props.setCouponBuyFilter(this.props.cantuanPrice)
                    return
                }
                wxPays.join('/pay/weixin/group/prepare.json',{buyingid:buyingid,groupid:groupid,couponid:this.props.couponid});
            }
            setTimeout(()=>{
                this.setState({
                    canClick: true
                })
            },3000)
        }else{
            return false
        }
    }
    render(){
        return(
            <div className="groupinfo">
                <div className="group_left">
                    <span className="avatar"><img className="uimgbox"
                                                  src={this.props.item['headimg']} alt="头像"/></span>
                    <div className="middle">
                        <h4><span className="avater-nick">{this.props.item['nick']}</span><b className="tuan_label">3人团</b>
                        </h4>
                        <div>
                            <span>还差</span><span
                            className="leftCount">{this.props.item['leftCount']}人</span><span>拼团</span> 剩余<span
                            className="time-left" data-lefttime={this.props.item['endTime']}>{this.state.remainTime}</span>
                        </div>
                    </div>
                </div>
                <a className="ulink cantuan" onClick={this.processPay.bind(this,this.props.item.groupid)}>去拼团</a>
            </div>
        )
    }
    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleGroup)
