import React, {Component} from 'react';
import './couponBuy.scss'
import {wxPays} from "../../common/js/wxpay";


export default class CouponBuy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponBuy: true
        }
    }

    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }

    processPay(couponid) {
        let buyingid = this._GetQueryString('id');
        let shareKey = this._GetQueryString('shareKey');
        let groupid = this.props.groupId;
        let mode = this.props.buyMode;
        switch (mode) {
            case 0:
                wxPays.join('/pay/weixin/group/prepare.json', {
                    buyingid: buyingid,
                    groupid: groupid,
                    couponid: couponid
                });
                break;
                ;
            case 1:
                wxPays.found('/pay/weixin/group/prepare.json', {
                    shareKey: shareKey,
                    buyingid: buyingid,
                    couponid: couponid
                });
                break;
            case 5:
                wxPays.justPay('/pay/weixin/youxue/prepare.json', {
                    shareKey: shareKey,
                    buyingid: buyingid,
                    couponid: couponid
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
                {this.props.showCouponBuy && <div className="show-cover-mask" onClick={()=>{this.props.setshowCouponBuy(false)}}></div>}
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
