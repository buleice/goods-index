import React, {Component} from 'react';
import './buybutton.scss'
import {wxPays} from "../../common/js/wxpay";

export default class BuyButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canClick: true
        }
    }


    processPayment(type) {
        let buyingid=this.props.buttonControl.id
        let shareKey=this.props.buttonControl.shareKey
        if (this.state.canClick) {
            this.setState({
                canClick: false
            })
        if(Number(this.props.buttonControl.founderPrice)>0){
            switch (type) {
                case 1:wxPays.found('/pay/weixin/group/prepare.json',{shareKey:shareKey,buyingid:buyingid});break;
                case 5:wxPays.justPay('/pay/weixin/youxue/prepare.json',{shareKey:shareKey,buyingid:buyingid});break;
                case 6:wxPays.bonusPay('/bonus/consume.json',{id:buyingid});break;
                default:return false;break;
            }
        }else{
            wxPays.freeFound('/groupbuying/freejoin.json',{id:buyingid});
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
                    <div className=" buttons">
                        <div className=" btn_left"><a className=" toindex" href="
                            /shop/index?from= default">《 更多拼团</a></div>
                        <div className=" b-btn">

                            {this.props.buttonControl.bonusPay === 0 ?
                                (<div className=" dandugou" onClick={this.processPayment.bind(this,5)} >
                                    <div className=" inline-box" ><span>单独购买: </span><span
                                        className=" sub">￥</span><span>99</span>
                                    </div>
                                </div>)
                                : (<div className=" dandugou" >
                                    <div className=" inline-box" onClick={this.processPayment.bind(this,6)}><span>奖学金兑换</span></div>
                                </div>)}

                            <div className="sanrentuan"  onClick={this.processPayment.bind(this,1)}>
                                <div className=" inline-box">
                                    <span>{this.props.buttonControl.Fmode}人拼团:</span>
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
}
