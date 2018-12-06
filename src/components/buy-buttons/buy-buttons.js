import React, {Component} from 'react';
import './buybutton.scss';
import {wxPays} from "../../common/js/wxpay";
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
        }
    }


    processPayment(type) {
        let buyingid = this.props.buttonControl.id
        let shareKey = this.props.buttonControl.shareKey
        if (this.state.canClick) {
            this.setState({
                canClick: false
            })
            if (Number(this.props.buttonControl.founderPrice) > 0) {
                switch (type) {
                    case 1:
                        wxPays.found('/pay/weixin/group/prepare.json', {shareKey: shareKey, buyingid: buyingid});
                        break;
                    case 5:
                        wxPays.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid});
                        break;
                    case 6:
                        wxPays.bonusPay('/bonus/consume.json', {id: buyingid});
                        break;
                    default:
                        return false;
                        break;
                }
            } else {
                wxPays.freeFound('/groupbuying/freejoin.json', {buyingid: buyingid});
            }
            setTimeout(() => {
                this.setState({
                    canClick: true
                })
            }, 3000)
        } else {
            return false
        }
    }

    dandugou() {
        let buyingid = this.props.buttonControl.id
        let shareKey = this.props.buttonControl.shareKey
        wxPays.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid});
    }

    render() {
        if (this.props.buttonControl.Fmode === 1) {
            return (
                <div className="buttons">
                    <div className="btn_left" style="width:50%;">
                        <a className="toindex" href={`/shop/index?from= ${this.props.buttonControl.from}`}>《 更多拼团</a>
                    </div>
                    <div className="dandugou">
                        <div className="inline-box">
                            <span>去购买 </span><span
                            className=" sub">￥</span><span>{this.props.buttonControl.ForiginalPrice}</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <PromptDialog  promptDesc={this.state.promptDesc}
                                  showPromptDialog={this.state.showPromptDialog} delPOk={this.delPOk.bind(this)}
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
                                : (<div className=" dandugou" onClick={this.dandugou.bind(this)}>
                                    <div className=" inline-box"><span>单独购买: </span><span
                                        className=" sub">￥</span><span>{this.props.buttonControl.ForiginalPrice}</span>
                                    </div>
                                </div>)}

                            <div className="sanrentuan" onClick={this.processPayment.bind(this, 1)}>
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
    delBonusExchange(){
        this.setState({
            showPromptDialog:true
        })
    }
}
