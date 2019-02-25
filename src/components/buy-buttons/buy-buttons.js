import React, {Component} from 'react';
import './buybutton.scss';
import {wxPays} from "../../common/js/wxpay";
import {newWxpay, xblPay} from "../../common/js/newWxpay";
import PromptDialog from '../weixin-dialog/weixin-dialog'

export default class BuyButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canClick: true,
            showPromptDialog: false,
            promptTitle: '',
            promptDesc: '您可以使用奖学金免费兑换该课程，是否兑换？',
            pcancleText: '',
            okText: '',
            canUseCouon: props.buttonControl.canUseCouon
        }
    }

    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }

    afterPay(params) {
        setTimeout(() => {
            if (params.needAddress === 1) {
                if(params.activity!=undefined&&params.activity!=null){
                    window.location.href = `/address/index?from=index#/orderpage?id=${params.bid}&goodsid=${this._GetQueryString('id')}`
                }else{
                    window.location.href = `/address/index?from=index#/orderpage?activity=${params.activity}&id=${params.bid}&goodsid=${this._GetQueryString('id')}`
                }
            } else {
                 if(params.activity!=undefined&&params.activity!=null){
                window.location.href='/purchase/20190218';
            }else{
                window.location.reload();
            }
            }
        }, 300)
    }

    processPayment(type, willPayPrice) {
        let filteredCoupons = this.props.userCoupons.filter(item => {
            return willPayPrice >= item.spendMoney
        });
        if (this.state.canUseCouon && filteredCoupons.length > 0) {
            this.props.setshowCouponBuy(true);
            this.props.setCouponBuyFilter(willPayPrice);
            this.props.setBuyMode(type)
            return
        }
        let buyingid = this.props.buttonControl.id;
        let shareKey = this.props.buttonControl.shareKey;
        if (this.state.canClick) {
            this.setState({
                canClick: false
            })
            setTimeout(() => {
                this.setState({
                    canClick: true
                })
            }, 2000)
            if (Number(this.props.buttonControl.founderPrice) > 0) {
                switch (type) {
                    case 1:
                        newWxpay.found('/pay/weixin/group/prepare.json', {
                            shareKey: shareKey,
                            buyingid: buyingid
                        }).then(res => {
                            this.afterPay(res)
                        }).catch(err => {
                            console.log(err)
                            window.alert("支付失败")
                        });
                        // wxPays.found('/pay/weixin/group/prepare.json', {shareKey: shareKey, buyingid: buyingid});
                        break;
                    case 5:
                        newWxpay.justPay('/pay/weixin/youxue/prepare.json', {
                            shareKey: shareKey,
                            buyingid: buyingid
                        }).then(res => {
                            this.afterPay(res)
                        }).catch(err => {
                            console.log(err)
                            window.alert("支付失败")
                        });
                        // wxPays.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid});
                        break;
                    case 6:
                        xblPay.bonusPay('/bonus/consume.json', {id: buyingid}).then(res => {
                            this.afterPay(res)
                        }).catch(err => {
                            console.log(err)
                            window.alert("兑换失败")
                        });
                        // wxPays.bonusPay('/bonus/consume.json', {id: buyingid});
                        break;
                    case 99:
                        newWxpay.AJoinPay('/pay/weixin/youxue/prepare.json',{
                            shareKey: shareKey,
                            buyingid: buyingid
                        }).then(res=>{
                            this.afterPay(Object.assign({},res,{activity:20190218}))
                        }).catch(err => {
                            console.log(err)
                            window.alert("支付失败")
                        });

                    default:
                        return false;
                }
            } else {
                wxPays.freeFound('/groupbuying/freejoin.json', {buyingid: buyingid});
            }
        } else {
            return false
        }
    }

    dandugou(willPayPrice) {
        let filteredCoupons = this.props.userCoupons.filter(item => {
            return willPayPrice >= item.spendMoney
        });
        if (this.state.canUseCouon && filteredCoupons.length > 0) {
            this.props.setshowCouponBuy(true);
            this.props.setCouponBuyFilter(willPayPrice);
            this.props.setBuyMode(5)
            return
        }
        let buyingid = this.props.buttonControl.id
        let shareKey = this.props.buttonControl.shareKey
        // wxPays.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid});
        newWxpay.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid}).then(res => {
            this.afterPay(res)
        }).catch(err => {
            console.log(err)
            window.alert("支付失败")
        })
    }

    render() {
        if(this.props.buttonControl.isActivity){
            return(
                <div className="buttons">
                    <div className="btn_left">
                        <a className="toindex" href={`/shop/index?from= ${this.props.buttonControl.from}`}>《
                            更多拼团</a>
                    </div>
                    <div className="dandugou">
                        <div className="inline-box"
                             onClick={this.processPayment.bind(this, 99, this.props.buttonControl.Fprice)}>
                            <span>去购买 </span><span
                            className=" sub">￥</span><span>{this.props.buttonControl.Fprice}</span>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    {
                        this.props.buttonControl.Fmode === 1 ?
                            (
                                <div className="buttons">
                                    <div className="btn_left">
                                        <a className="toindex" href={`/shop/index?from= ${this.props.buttonControl.from}`}>《
                                            更多拼团</a>
                                    </div>
                                    <div className="dandugou">
                                        <div className="inline-box"
                                             onClick={this.dandugou.bind(this, this.props.buttonControl.ForiginalPrice)}>
                                            <span>去购买 </span><span
                                            className=" sub">￥</span><span>{this.props.buttonControl.ForiginalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            (
                                <div>
                                    <PromptDialog promptDesc={this.state.promptDesc}
                                                  showPromptDialog={this.state.showPromptDialog}
                                                  delPOk={this.delPOk.bind(this)}
                                                  delPCancle={this.delPCancle.bind(this)}></PromptDialog>
                                    <div className=" buttons">
                                        <div className=" btn_left"><a className=" toindex" href="
                            /shop/index?from= default">《 更多拼团</a></div>
                                        <div className=" b-btn">

                                            {this.props.buttonControl.bonusPay === 1 && Number(this.props.buttonControl.founderPrice) > 0 ?
                                                (<div className=" dandugou">
                                                    <div className=" inline-box" onClick={this.delBonusExchange.bind(this)}>
                                                        <span>奖学金兑换</span></div>
                                                </div>)
                                                : (<div className=" dandugou"
                                                        onClick={this.dandugou.bind(this, this.props.buttonControl.ForiginalPrice)}>
                                                    <div className=" inline-box"><span>单独购买: </span><span
                                                        className=" sub">￥</span><span>{this.props.buttonControl.ForiginalPrice}</span>
                                                    </div>
                                                </div>)}

                                            <div className="sanrentuan"
                                                 onClick={this.processPayment.bind(this, 1, this.props.buttonControl.founderPrice)}>
                                                <div className=" inline-box">
                                                    <span>{this.props.buttonControl.buttonText}</span>
                                                    <span className="sub">￥</span><span
                                                    id=" special_price">{this.props.buttonControl.founderPrice}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            )
        }

    }

    delPOk() {
        this.setState({
            showPromptDialog: false
        })
        wxPays.bonusPay('/bonus/consume.json', {id: this.props.buttonControl.id});
    }

    delPCancle() {
        this.setState({
            showPromptDialog: false
        })
    }

    delBonusExchange() {
        this.setState({
            showPromptDialog: true
        })
    }
}
