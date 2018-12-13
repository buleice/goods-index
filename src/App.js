import React, {Component} from 'react';
import axios from 'axios';
import './App.scss';
import Carousel from './components/betterScroll/betterScroll';
import GoodInfo from './components/goodInfo/goodInfo';
import ProductsInfo from './components/products-introduction/products-introduction';
import MoreCourse from './components/more-course/more-course'
import PeopleInGroup from './containers/people-in-group'
import GuiZe from './containers/guize'
import GroupList from './containers/group-list'
import BuyButtons from './containers/buyButtonGroup'
import CouponBuy from './containers/couponBuy'
import ScroolYToTop from './components/toTop/totop';
import {wxShare} from "./common/js/wxshare";
import * as Sentry from '@sentry/browser';
Sentry.init({
 dsn: "https://f7511a6358f645239345a7cae6f77519@sentry.io/1337784"
});
// should have been called before using it here
// ideally before even rendering your react app

class App extends Component {
    constructor() {
        super();
        this.state = {
            goodInfo: [],
            isRender: false,
            goodInfoData: {}
        }
        this._GetQueryString = this._GetQueryString.bind(this)
    }

    componentWillMount() {
        axios.get(`/purchase/index.json?id=${this._GetQueryString("id")}`).then(res => {
            if (res.status === 200) {
                let pageData = res.data;
                let isBuy=Number(pageData.buyingInfo.Fprice)>0?false:true
                this.props.setTm(pageData.tm)
                this.props.setGroups(pageData.userList)
                this.props.setFreeBuy(isBuy);
                this.props.setUserCoupons(pageData.coupons)
                this.props.setCantuanPrice(pageData.buyingInfo.Fprice)
                wxShare({
                    FshareTitle:pageData.buyingInfo.FshareTitle1,
                    FshareIcon:pageData.buyingInfo.FshareIcon,
                    FshareContent:pageData.buyingInfo.FshareContent1,
                    buyingId:this._GetQueryString("id"),
                    shareKey:pageData.myShareKey,
                })
                this.setState({
                    shareData:{
                        FshareTitle:pageData.buyingInfo.FshareTitle1,
                        FshareIcon:pageData.buyingInfo.FshareIcon,
                        FshareContent:pageData.buyingInfo.FshareContent1
                    },
                    goodInfo: pageData,
                    isRender: true,
                    goodInfoData: {
                        hasBonus: pageData.canGetBonus,
                        id: this._GetQueryString("id"),
                        shareKey: pageData.myShareKey,
                        Fsubtitle: pageData.buyingInfo.Fsubtitle,
                        Ftitle: pageData.buyingInfo.Ftitle,
                        origPrice: pageData.origPrice,
                        buyPrice: pageData.buyPrice,
                        Fsales: pageData.buyingInfo.Fsales,
                        Fprice: pageData.buyingInfo.Fprice,
                        ForiginalPrice: pageData.buyingInfo.ForiginalPrice
                    },
                    recommend: pageData.recommend,
                    Fintros: [res.data.buyingInfo.Fintro1, res.data.buyingInfo.Fintro2, res.data.buyingInfo.Fintro3],
                    buttonControl: {
                        bonusPay: pageData.bonusPay,
                        ForiginalPrice: pageData.buyingInfo.ForiginalPrice,
                        buttonText: pageData.buttonText,
                        Fmode: pageData.buyingInfo.Fmode,
                        from: pageData.from,
                        founderPrice: pageData.founderPrice,
                        id:this._GetQueryString("id"),
                        shareKey:this._GetQueryString('shareKey'),
                        canUseCouon:pageData.coupons.length>0?true:false,
                    },
                    peopleInGroup: {
                        Fmode: pageData.buyingInfo.Fmode,
                        nowBuyingCount: pageData.nowBuyingCount,
                        recent: pageData.recent,
                        userList: pageData.userList,
                        tm: pageData.tm
                    },
                    groupList: {
                        Fmode: pageData.buyingInfo.Fmode,
                        nowBuyingCount: pageData.nowBuyingCount,
                        id: this._GetQueryString("id")
                    },
                    qunQrcode:pageData.Qunlist!==null?pageData.Qunlist.imgcontent[0]:'',
                    Fvideo:pageData.buyingInfo.Fvideo,
                    coupons:pageData.coupons
                })
            }
        })
    }
    render() {
        if (this.state.isRender) {
            return (
                <div className={`App ${this.props.modalOpen?'modal-open':''}`}>
                    {this.state.goodInfo.buyingInfo.Fbanner.length>=1&&this.state.goodInfo.buyingInfo.Fvideo!==''?(<Carousel slideItemData={this.state.goodInfo.buyingInfo.Fbanner} vsrc={this.state.goodInfo.buyingInfo.Fvideo}></Carousel>):(<div className='single-banner'><img src={this.state.goodInfo.buyingInfo.Fbanner[0]} alt={"图片"}/></div>)}
                    <GoodInfo goodInfo={this.state.goodInfoData}></GoodInfo>
                    <PeopleInGroup peopleInGroup={this.state.peopleInGroup}></PeopleInGroup>
                    <GuiZe></GuiZe>
                    <GroupList groupList={this.state.groupList}></GroupList>
                    <MoreCourse lists={this.state.recommend}></MoreCourse>
                    <ProductsInfo Fvideo={this.state.Fvideo} qunQrcode={this.state.qunQrcode} Fintros={this.state.Fintros}></ProductsInfo>
                    <CouponBuy></CouponBuy>
                    <BuyButtons buttonControl={this.state.buttonControl}></BuyButtons>
                    <ScroolYToTop></ScroolYToTop>
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

    _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
    }
}

export default App
