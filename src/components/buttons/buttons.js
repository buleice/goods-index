import React, {Component} from 'react';
import {ROOT} from '../common/js/url-config';
// import { CSSTransitionGroup } from 'react-transition-group';
import './buttons.css'
import '../common/css/weui.min.css'
import inventory from '../../asserts/inventory.png'
import {wxPay} from '../common/js/jsSdk'

export default class FooterButtons extends Component {
    constructor(props) {
        super(props);
        this.pullUpToPay = this.pullUpToPay.bind(this);
        this.state = {
            isalert: false,
            alertContent: "支付成功"
        }
        this.hideAlert = this.hideAlert.bind(this)
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    render() {
        return (
            <div>
                {this.props.allBuy===0?
                (
                <ul className="buttons">
                    <li onClick={this.props.changeStatus}>
                        <div className="lists"><img className="inventory" src={inventory} alt="数量"/><b
                            className="badge">+{this.props.buyingInfo.count}</b></div>
                        <div className="total-price"><span
                            className="group-text">系列购买  </span>￥<span>{this.props.buyingInfo.buyPrice}</span></div>
                    </li>
                    <li onClick={this.pullUpToPay}>购买</li>
                </ul>
                ):
                (<a href="/shop/index?source=mine" className="shangKe">去上课</a>)}
                <div className="js_dialog" className={this.state.isalert ? "showAlert" : "hideAlert"}>
                    <div className="weui-mask"></div>
                    <div className="weui-dialog">
                        <div className="weui-dialog__bd">{this.state.alertContent}</div>
                        <div className="weui-dialog__ft">
                            <a className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.hideAlert}>确定</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    hideAlert() {
        this.setState({isalert: false});
        window.location.reload();
    }

    pullUpToPay() {
        wxPay(`${ROOT}/pay/weixin/series/prepare.json`, this.props.buyingInfo);
        window.MtaH5.clickStat("pay_series",{"p":this.props.buyingInfo.buyPrice})
        // if (!payStatus) {
        //     this.setState({
        //         isalert: true,
        //         alertContent: "支付失败"
        //     })
        // } else if(payStatus) {
        //     this.setState({
        //         isalert: true,
        //         alertContent: "支付成功"
        //     })
        // }
    }
}
