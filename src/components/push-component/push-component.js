import React, {Component} from 'react';
import './push-component.scss';

export default class AdPush extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAd: true
        }
    }

    render() {
        if(1==1){
            return(
                <div>
                    {this.state.showAd && this.props.couponSent != undefined && !this.props.newUser ? (
                        <div className="coupons" onClick={() => {
                            this.setState({showAd: false})
                        }}>
                            <img className="festival" src="//udata.youban.com/webimg/wxyx/push/festival.png" alt=""/>
                            <div className="festival-close" onClick={() => {
                                this.setState({showAd: false})
                            }}></div>
                        </div>
                    ) : null}
                </div>
            )
        }else{
            return (
                <div>
                    {this.state.showAd && this.props.couponSent!=undefined&&!this.props.newUser ? (
                        <div className="coupons" onClick={()=>{this.setState({showAd:false})}}>
                            <div className="content">
                                <h3>嗨！{this.props.newUser?"新朋友":"老朋友"}</h3>
                                <div className="desc">
                                    <span className="shuli">送你</span>
                                    <span>{this.props.couponSent.couponMoney}</span>
                                    <span>元</span>
                                </div>
                                <div className="title">{this.props.couponSent.name}</div>
                            </div>
                            <div class="close-coupon" onClick={()=>{this.setState({showAd:false})}}></div>
                        </div>
                    ) : null}
                </div>
            )
        }

    }
}
