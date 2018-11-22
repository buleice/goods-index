import React,{Component} from 'react';
import './buybutton.scss'

export default class BuyButtons extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <div className="buttons">
                    <div className="btn_left"><a className="toindex" href="/shop/index?from=default">《 更多拼团</a></div>
                    <div className="b-btn">
                        {/*<div className="dandugou" id="dandugou">*/}
                            {/*<div className="inline-box"><span>单独购买: </span><span className="sub">￥</span><span>99</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="dandugou" id="bonus-exchange">
                            <div className="inline-box"><span>奖学金兑换</span></div>
                        </div>
                        <div className="sanrentuan">
                            <div className="inline-box">
                                <span>3人拼团:</span>
                                <span className="sub">￥</span><span id="special_price">29.9</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
