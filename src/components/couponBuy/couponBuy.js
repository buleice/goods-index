import React, {Component} from 'react';
import './couponBuy.scss';
import {payRequest} from "../../api/payRequest";


export default class CouponBuy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponBuy: true
        }
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
    afterPay(params) {
        const buyingId=this._GetQueryString('id');
        function toSchedulPage(){
            if(params.groupid!==''&&params.groupid!==undefined){
                this.props.history.push(`/progress/${buyingId}/${params.groupid}`)
                // window.location.href=`/purchase/detail?buyingid=${buyingId}&groupid=${params.groupid}&from=default&purchased=1`
            }else{
                this.props.history.push(`/success/${buyingId}/${params.groupid}`)
                // window.location.href=`/groupbuying/success?buyingid=${buyingId}&from=default&purchased=1`
            }
        }
        setTimeout(() => {
            if (params.activity !== undefined && params.activity !== null && params.activity != '') {
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
    processPay(couponid) {
        let buyingid = this._GetQueryString('id');
        let shareKey = this._GetQueryString('shareKey');
        let groupid = this.props.groupId;
        let mode = this.props.buyMode;
        switch (mode) {
            case 0: //非免费参团
                payRequest.join('/pay/weixin/group/prepare.json', {
                    shareKey: shareKey,
                    buyingid: buyingid,
                    groupid: groupid,
                    couponid: couponid
                }).then(res => {
                    this.afterPay(res)
                }).catch(err => {
                    window.alert("支付失败")
                });
                break;
            case 1: //非免费开团
                payRequest.found('/pay/weixin/group/prepare.json', {
                    shareKey: shareKey,
                    buyingid: buyingid,
                    couponid: couponid,
                    urltag:window.location.pathname.indexOf('share') < 0?'wxyx_groupbuying_1':'wxyx_groupbuying_share'
                }).then(res => {
                    this.afterPay(res)
                }).catch(err => {
                    window.alert("支付失败")
                });
                break;
            case 5: //直接原价购买
                payRequest.justPay('/pay/weixin/youxue/prepare.json', {
                    shareKey: shareKey,
                    buyingid: buyingid,
                    couponid: couponid,
                }).then(res => {
                    this.afterPay(res)
                }).catch(err => {
                    window.alert("支付失败")
                });
                break;
            case 99: //通过运营活动购买
                payRequest.AJoinPay('/pay/weixin/youxue/prepare.json',{
                    shareKey: shareKey,
                    buyingid: buyingid,
                    couponid: couponid,
                }).then(res=>{
                    this.afterPay(Object.assign({},res,{activity:20190218}))
                }).catch(err => {
                    console.log(err)
                    window.alert("支付失败")
                });
                break;
            default:
                return;
        }
    }

    payByclickCoupon(id) {
        this.processPay(id);
    }

    payByClickButton() {
        this.processPay("");
    }

    render() {
        let filteredCoupons = this.props.userCoupons.filter(item => {
            return this.props.couponBuyFilter >= item.spendMoney
        });
        return (
            <div>
                {this.props.showCouponBuy && <div className="show-cover-mask" onClick={() => {
                    this.props.setshowCouponBuy(false)
                }}></div>}
                {
                    this.props.showCouponBuy && (<div className={'buyStyle-options'}>
                        <div className={"select-info"}>您有{filteredCoupons.length}张可用优惠券 <img
                            src="//wxyx.youban.com/img/delete.png"
                            alt="close" onClick={() => {
                            this.props.setshowCouponBuy(false)
                        }}/></div>
                        <ul className={"coupons-can-select"}>
                            {filteredCoupons.map((item, index) => <li className={'coupon'}
                                                                      onClick={() => this.payByclickCoupon(item.id)}
                                                                      key={index}>
                                <ul className={"left"}>
                                    <li><span>￥</span><span>{item.couponMoney}</span></li>
                                    <li>满{item.spendMoney}元可用</li>
                                </ul>
                                <ul className={"middle"}>
                                    <li>{item.name}</li>
                                    {/*<li></li>*/}
                                    <li>有效期至:{item.expiration}</li>
                                </ul>
                                <div className={"right"}>
                                    <span>使用</span>
                                    <img src="//udata.youban.com/webimg/wxyx/puintuan/discount1.png" alt=""/>
                                </div>
                            </li>)}
                        </ul>
                        <div className={'coupons-buy'}
                             onClick={() => this.payByClickButton()}>直接支付 <span>￥</span><span>{this.props.couponBuyFilter}</span>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}
