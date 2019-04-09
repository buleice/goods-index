import React, {Component} from 'react';
import Carousel from '../components/betterScroll/betterScroll';
import GoodInfo from '../components/goodInfo/goodInfo';
import ProductsInfo from '../components/products-introduction/products-introduction';
import AvatarBox from '../components/avatar/avatar'
import ScroolYToTop from '../components/toTop/totop';
import GroupProgress from '../components/group-progress-info/group-progress-info'
import AdPush from '../components/push-component/push-component';
import MoreCourse from '../components/more-course/more-course'
import {wxShare} from "../common/js/wxshare";
import Danmaku from '../components/Danmaku/Danmaku'
import {GET_GROUP_PROGRESS} from '../api/requestApis';

import './progress.scss'
class ProgressPage extends Component {
    constructor() {
        super();
        this.state = {
            goodInfo: [],
            isRender: false,
            goodInfoData: {},
            showSubscrib:true,

        }
        this._GetQueryString = this._GetQueryString.bind(this)
    }
    componentDidMount() {
        this._initPageData();
        window.addEventListener('pageshow', function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        })
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     if(nextState.showSubscrib === this.state.showSubscrib){
    //       return false
    //     }
    // }

    toggleSubscrib(boo){
        this.setState({
            showSubscrib:boo
        })
    }

    render() {
        if (this.state.isRender) {
            return (
                <div className={`App ${this.props.modalOpen ? 'modal-open' : ''}`}>
                    <div className="slider-banner">
                        {this.state.goodInfo.buyingInfo.Fbanner.length > 1 ? (
                            <Carousel slideItemData={this.state.goodInfo.buyingInfo.Fbanner}></Carousel>) : (
                            <div className='single-banner'><img src={this.state.goodInfo.buyingInfo.Fbanner[0]} alt={"图片"}/>
                       </div>)}
                       <Danmaku messageList={this.state.messageList}></Danmaku>
                       {
                           this.state.subscribe==0&&this.state.showSubscrib?(
                            <div className="qrcode-area">
                                <img className="qrcode" src="//udata.youban.com//webimg/wxyx/puintuan/common/img/join-qrcode2.png" alt="图片"/>
                                <img className="close-ad" onClick={this.toggleSubscrib.bind(this,false)} src="//udata.youban.com//webimg/wxyx/puintuan/common/img/join-close.png" alt="图片"/>
                                <div className="content">
                                    <h4>你还未关注小伴龙优学公众号</h4>
                                    <p>关注小伴龙优学第一时间掌握优学课程更新以及拼团优惠信息</p>
                                    <a className="sub-btn"  href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU1Mjc4MzQ4Ng==&scene=126#wechat_redirect">立即关注</a>
                                </div>
                            </div>
                           ):null
                       }
                       {
                        this.state.subscribe==0&&!this.state.showSubscrib? (<img onClick={(e)=>this.toggleSubscrib(true,e)} className="notification" src="//udata.youban.com//webimg/wxyx/puintuan/common/img/join-notification.gif" alt="图片"/>):null
                       }
                    </div>
                    <GoodInfo goodInfo={this.state.goodInfoData}></GoodInfo>
                    <AvatarBox avatarBoxInfo={this.state.avatarBoxInfo}></AvatarBox>
                    <GroupProgress progressInfo={this.state.progressInfo} buyingInfo={this.state.buyingInfo}> </GroupProgress>
                    <MoreCourse lists={this.state.recommend}></MoreCourse>
                    <ProductsInfo Fvideo={this.state.Fvideo} qunQrcode={this.state.qunQrcode}
                                  Fintros={this.state.Fintros}></ProductsInfo>
                    <ScroolYToTop></ScroolYToTop>
                    <AdPush couponSent={this.state.couponSent[0]} newUser={this.state.newUser}></AdPush>
                </div>
            );
        } else {
            return (<div className="loading-mask">
                <div className="loader">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square last"></div>
                    <div className="square clear"></div>
                    <div className="square"></div>
                    <div className="square last"></div>
                    <div className="square clear"></div>
                    <div className="square "></div>
                    <div className="square last"></div>
                </div>
            </div>)
        }
    }

    _initPageData() {
        GET_GROUP_PROGRESS({
          buyingid:this.props.match.params.buyingid,
          groupid:this.props.match.params.groupid
        }).then(res=>{
            const pageData=res.data;
                let isFree = Number(pageData.buyingInfo.Fprice) > 0 ? false : true;
                let isBuy = pageData.isBUy;
                if (isBuy) {
                    window.location.reload();
                    return;
                }
                this.props.setPageData(pageData);
                this.props.setTm(pageData.tm)
                wxShare({
                    FshareTitle: pageData.buyingInfo.FshareTitle1,
                    FshareIcon: pageData.buyingInfo.FshareIcon,
                    FshareContent: pageData.buyingInfo.FshareContent1,
                    buyingId: this._GetQueryString("id"),
                    shareKey: pageData.myShareKey,
                })
                this.setState({
                    shareData: {
                        FshareTitle: pageData.buyingInfo.FshareTitle1,
                        FshareIcon: pageData.buyingInfo.FshareIcon,
                        FshareContent: pageData.buyingInfo.FshareContent1
                    },
                    goodInfo: pageData,
                    isRender: true,
                    buyingInfo:pageData.buyingInfo,
                    goodInfoData: {
                        hasBonus: pageData.canGetBonus,
                        id: this._GetQueryString("id"),
                        shareKey: pageData.myShareKey,
                        Fsubtitle: pageData.buyingInfo.Fsubtitle,
                        Ftitle: pageData.buyingInfo.Ftitle,
                        origPrice: pageData.origPrice,
                        buyPrice: pageData.buyPrice,
                        Fsales: pageData.buyingInfo.Fsales,
                        Fprice: window.location.pathname.indexOf('share') < 0 ? pageData.buyingInfo.Fprice : pageData.founderPrice,
                        ForiginalPrice: pageData.buyingInfo.ForiginalPrice,
                        Fbonus: window.location.pathname.indexOf('share') > 0 ? false : pageData.bonus,
                        showLine3:true,
                    },
                    recommend: pageData.recommend,
                    Fintros: [res.data.buyingInfo.Fintro1, res.data.buyingInfo.Fintro2, res.data.buyingInfo.Fintro3],
                    qunQrcode: pageData.Qunlist !== null ? pageData.Qunlist.imgcontent[0] : '',
                    Fvideo: pageData.buyingInfo.Fvideo,
                    coupons: pageData.coupons,
                    couponSent: pageData.couponSent,
                    newUser: pageData.isNew === 1 ? true : false,
                    avatarBoxInfo:{
                     status:pageData.status,
                     userList:pageData.userList,
                     limitPeople:pageData.buyingInfo.Fmode,
                    },
                    progressInfo:{
                        endTime:pageData.endTime,
                        leftCount:pageData.leftCount,
                        userCount:pageData.userCount,
                        userList:pageData.userList,
                        status:pageData.status,
                        from: this._GetQueryString("from"),
                    },
                    subscribe:pageData.subscribe,
                    messageList:pageData.messageList
                })
            }).catch(error=>{
            console.log(error)
        })
    }
    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
}

export default ProgressPage
