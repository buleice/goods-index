import React, {Component} from "react";
import Transition from 'react-transition-group/Transition';

import './guize.scss'


export default class GuiZe extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    render() {
        const duration=300
        return (
            <div>
                <div className={this.props.showStatus?'show-cover-mask':'hide-cover-mask'} onClick={()=>{this.props.onGuizeClick(false);this.props.setModalOpen(false)}}></div>
                <div className="guize" onClick={()=>{this.props.onGuizeClick(true);this.props.setModalOpen(true)}}>
                    <div><img src="//udata.youban.com/webimg/wxyx/puintuan/common/img/rule_icon.png" alt="rule-icon"/>拼成即可上课
                    </div>
                    <div><img src="//udata.youban.com/webimg/wxyx/puintuan/common/img/rule_icon.png" alt="rule-icon"/>拼团失败原路退还
                    </div>
                    <div></div>
                </div>
                <Transition in={this.props.showStatus} timeout={duration}>
                    {status=>(
                        <div className={`slide slide-${status}`}>
                            <div className="header2">
                                <span className="title">活动规则</span>
                                <img onClick={()=>{this.props.onGuizeClick(false);this.props.setModalOpen(false)}} src="//wxyx.youban.com/img/delete.png" id="close-button-t"/>
                            </div>
                            <div className="jieshao-body">
                                <div className="jieshao-label">
                                    <div><i>1</i><b>什么是3人拼团？</b></div>
                                    <p>
                                        3人拼团是由
                                        3个人一起拼单购买的团购活动，通过拼团可以享受优惠折扣价。任何用户都可开团，满3人即可成团享受优惠。</p>
                                </div>
                                <div className="jieshao-label">
                                    <div><i>2</i><b>怎样才算拼团成功？</b></div>
                                    <p>在拼团的有效期内，找到满足的人数参加拼团，则拼团成功。</p>
                                </div>
                                <div className="jieshao-label">
                                    <div><i>3</i><b>团购课程能在小伴龙APP中使用吗？</b></div>
                                    <p>团购课程与小伴龙APP是两套完全不同的内容，不能在小伴龙APP中使用。</p>
                                </div>
                                <div className="jieshao-label">
                                    <div><i>4</i><b>拼团成功后如何上课？</b></div>
                                    <p>您可以在小伴龙公众号或小伴龙早教中进入上课。 小伴龙微信：点击菜单栏 “小伴龙甄选—优学拼团”，进入上课。 小伴龙早教：点击菜单栏左侧“热门拼团”，进入上课。
                                    </p>
                                </div>
                                <div className="jieshao-label">
                                    <div><i>5</i><b>拼团失败后会退款吗？</b></div>
                                    <p>有效期内没有凑齐人数，即算拼团失败。拼团失败后，退款会在1-5个工作日内，原路退回支付账户中。</p>
                                </div>
                                <div className="jieshao-label">
                                    <div><i>6</i><b>如果有问题，怎么联系客服？</b></div>
                                    <p>请点击小伴龙微信菜单“好服务—客服”联系客服咨询。</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        )
    }
}
