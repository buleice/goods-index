import React, {Component} from 'react';
import './push-component.scss';

export default class AdPush extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAd: true
        }
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    render() {
        if (1 === 1) {
            let coupon = this.props.couponSent
            return (
                <div>
                    {this.state.showAd && this.props.couponSent != undefined && !this.props.newUser ? (
                        <div className="coupons" onClick={() => {
                            this.setState({showAd: false})
                        }}>
                            <div className="content">
                                <h3>送给您一张</h3>
                                <h2>{coupon.name}</h2>
                                <div className="coupon_bg">
                                    <p>{coupon.couponMoney}<sub>元</sub></p>
                                    <p>适用于:<br/>{coupon.lesson}</p>
                                </div>
                                <div className="close-coupon" onClick={() => {
                                    this.setState({showAd: false})
                                }}>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.showAd && this.props.couponSent != undefined && !this.props.newUser ? (
                        <div className="coupons" onClick={() => {
                            this.setState({showAd: false})
                        }}>
                            <div className="content">
                                <h3>嗨！{this.props.newUser ? "新朋友" : "老朋友"}</h3>
                                <div className="desc">
                                    <span className="shuli">送你</span>
                                    <span>{this.props.couponSent.couponMoney}</span>
                                    <span>元</span>
                                </div>
                                <div className="title">{this.props.couponSent.name}</div>
                            </div>
                            <div className="close-coupon" onClick={() => {
                                this.setState({showAd: false})
                            }}></div>
                        </div>
                    ) : null}
                </div>
            )
        }

    }
}
