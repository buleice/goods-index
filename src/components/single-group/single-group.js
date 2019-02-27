import React, {Component} from 'react';
import './single-group.scss';
import {connect} from 'react-redux';
import {backTimeString} from '../../common/js/process'
import {wxPays} from "../../common/js/wxpay";
import {newWxpay, xblPay} from "../../common/js/newWxpay";
import {couponBuyFilter, showCouponBuy, buyMode, groupId, showMoreGroup} from "../../actions";

const mapStateToProps = (state, props) => ({
    tm: state.tm,
    freeBuy: state.freeBuy,
    userCoupons: state.userCoupons,
    cantuanPrice: state.cantuanPrice,
    couponid: state.couponId
})
const mapDispatchToProps = dispatch => ({
    setCouponBuyFilter: condition => dispatch(couponBuyFilter(condition)),
    setshowCouponBuy: isShow => dispatch(showCouponBuy(isShow)),
    setBuyMode: mode => dispatch(buyMode(mode)),
    setGroupId: id => dispatch(groupId(id)),
    onShowMoreGroupClick: isShowMoreGroup => dispatch(showMoreGroup(isShowMoreGroup)),
})

class SingleGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endTime: props.item.endTime,
            remainTime: '',
            canClick: true
        }
        this._GetQueryString = this._GetQueryString.bind(this)
    }

    componentDidMount() {
        let endTime = this.state.endTime;
        let _this = this;
        let tm = this.props.tm;
        let timeloop = setInterval(function () {
            if (backTimeString(endTime, tm) !== 0) {
                _this.setState({
                    remainTime: backTimeString(endTime, tm)
                })
                tm++;
            } else {
                clearInterval(timeloop);
                window.location.reload();
            }
        }, 1000)
    }
    afterPay(params) {
        const buyingId=this._GetQueryString('id');
        function toSchedulPage(){
            if(params.groupid!==''&&params.groupid!==undefined){
                window.location.href=`/purchase/detail?buyingid=${buyingId}&groupid=${params.groupid}&from=default&purchased=1`
            }else{
                window.location.href=`/groupbuying/success?buyingid=${buyingId}&from=default&purchased=1`
            }
        }
        setTimeout(() => {
            if (params.activity != undefined && params.activity != null && params.activity != '') {
                params.needAddress === 1 ?
                    window.location.href = `/address/index?from=index#/orderpage?activity=${params.activity}&id=${params.bid}&goodsid=${buyingId}`
                    :
                    window.location.href = '/purchase/20190218'
            } else {
                params.needAddress === 1 ?
                    window.location.href = `/address/index?from=index#/orderpage?id=${params.bid}&goodsid=${buyingId}`
                    :
                    toSchedulPage();
            }
        }, 300)
    }

    processPay(groupid) {
        let isFree = this.props.freeBuy;
        let buyingid = this._GetQueryString('id');
        if (this.state.canClick) {
            this.props.setGroupId(groupid);
            this.props.setBuyMode(0);
            this.props.onShowMoreGroupClick(false)
            this.setState({
                canClick: false
            })
            setTimeout(() => {
                this.setState({
                    canClick: true
                })
            }, 2000)
            if (isFree) {
                xblPay.freeJoin('/groupbuying/freejoin.json', {buyingid: buyingid, groupid: groupid}).then(res=>{
                    setTimeout(()=>{
                        window.location.href=`/purchase/detail?buyingid=${buyingid}&groupid=${groupid}&from=default&purchased=1`
                    },300)
                }).catch(err => {
                    console.log(err)
                });
            } else {
                let filteredCoupons = this.props.userCoupons.filter(item => {
                    return this.props.cantuanPrice >= item.spendMoney
                });
                if (filteredCoupons.length > 0) {
                    this.props.setshowCouponBuy(true);
                    this.props.setCouponBuyFilter(this.props.cantuanPrice)
                    return
                }
                newWxpay.join('/pay/weixin/group/prepare.json', {
                    buyingid: buyingid,
                    groupid: groupid,
                    couponid: this.props.couponid
                }).then(res => {
                    this.afterPay(res)
                }).catch(err => {
                    console.log(err)
                });
                // wxPays.join('/pay/weixin/group/prepare.json',{buyingid:buyingid,groupid:groupid,couponid:this.props.couponid});
            }
        } else {
            return false
        }
    }

    render() {
        return (
            <div className="groupinfo">
                <div className="group_left">
                    <span className="avatar"><img className="uimgbox"
                                                  src={this.props.item['headimg']} alt="头像"/></span>
                    <div className="middle">
                        <h4><span className="avater-nick">{this.props.item['nick']}</span><b
                            className="tuan_label">{this.props.Fmode}人团</b>
                        </h4>
                        <div>
                            <span>还差</span><span
                            className="leftCount">{this.props.item['leftCount']}人</span><span>拼团</span> 剩余<span
                            className="time-left"
                            data-lefttime={this.props.item['endTime']}>{this.state.remainTime}</span>
                        </div>
                    </div>
                </div>
                <a className="ulink cantuan" onClick={this.processPay.bind(this, this.props.item.groupid)}>去拼团</a>
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
