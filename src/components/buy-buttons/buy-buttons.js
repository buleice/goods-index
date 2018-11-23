import React, {Component} from 'react';
import './buybutton.scss'

export default class BuyButtons extends Component {
    constructor(props) {
        super(props);

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
                                (<div className=" dandugou">
                                    <div className=" inline-box"><span>单独购买: </span><span
                                        className=" sub">￥</span><span>99</span>
                                    </div>
                                </div>)
                                : (<div className=" dandugou">
                                    <div className=" inline-box"><span>奖学金兑换</span></div>
                                </div>)}

                            <div className=" sanrentuan">
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
