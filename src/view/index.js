import React, {Component} from 'react';
import Carousel from '../components/betterScroll/betterScroll';
import GoodInfo from '../components/goodInfo/goodInfo';
import ProductsInfo from '../components/products-introduction/products-introduction';
import PeopleInGroup from '../store/containers/people-in-group'
import GuiZe from '../store/containers/guize'
import GroupList from '../store/containers/group-list'
import BuyButtons from '../store/containers/buyButtonGroup'
import CouponBuy from '../store/containers/couponBuy'
import ScroolYToTop from '../components/toTop/totop';
import AdPush from '../components/push-component/push-component';
import {wxShare} from "../common/js/wxshare";
import {requestPageData} from '../api/requestApis'
class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            goodInfo: [],
            isRender: false,
            goodInfoData: {}
        }
        this._GetQueryString = this._GetQueryString.bind(this)
    }
    componentWillUnMount() {
        this.setState=(state,callback)=>{
          return;
        }
    }
    componentDidMount() {
        this._initPageData();
        window.addEventListener('pageshow', function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        })
        // window.addEventListener('popstate',(event) => {
        //     // 监听到返回事件，注意，只有触发了返回才会执行这个方法
        //     if (event.persisted) {
        //         window.location.reload();
        //     }
        // })
    }

    render() {
        if (this.state.isRender) {
            return (
                <div className={`App ${this.props.modalOpen ? 'modal-open' : ''}`}>
                    {this.state.goodInfo.buyingInfo.Fbanner.length > 1 ? (
                        <Carousel slideItemData={this.state.goodInfo.buyingInfo.Fbanner}></Carousel>) : (
                        <div className='single-banner'><img src={this.state.goodInfo.buyingInfo.Fbanner[0]} alt={"图片"}/>
                        </div>)}
                    <GoodInfo goodInfo={this.state.goodInfoData}></GoodInfo>
                    {
                        !this._GetQueryString('isactivity') && this.state.buttonControl.Fmode !== 9 ? (<div>
                            <PeopleInGroup peopleInGroup={this.state.peopleInGroup}></PeopleInGroup>
                            <GuiZe></GuiZe>
                            <GroupList groupList={this.state.groupList}></GroupList>
                        </div>) : null
                    }

                    <ProductsInfo Fvideo={this.state.Fvideo} qunQrcode={this.state.qunQrcode}
                                  Fintros={this.state.Fintros}></ProductsInfo>
                    <CouponBuy></CouponBuy>
                    <BuyButtons buttonControl={this.state.buttonControl}></BuyButtons>
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
        requestPageData().then(res => {
            if (res.status === 200) {
                let pageData = res.data;
                let isFree = Number(pageData.buyingInfo.Fprice) > 0 ? false : true;
                let isBuy = pageData.isBUy;
                if (isBuy) {
                    window.location.reload();
                    return;
                }
                this.props.setTm(pageData.tm)
                this.props.setGroups(pageData.userList)
                this.props.setFreeBuy(isFree);
                this.props.setUserCoupons(pageData.coupons)
                this.props.setCantuanPrice(pageData.buyingInfo.Fprice)
                this.props.setPageData(pageData);
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
                        Fbonus: window.location.pathname.indexOf('share') > 0 ? false : pageData.bonus
                    },
                    recommend: pageData.recommend,
                    Fintros: [res.data.buyingInfo.Fintro1, res.data.buyingInfo.Fintro2, res.data.buyingInfo.Fintro3],
                    buttonControl: {
                        bonusPay: pageData.bonusPay,
                        ForiginalPrice: pageData.buyingInfo.ForiginalPrice,
                        buttonText: pageData.buttonText,
                        Fmode: window.location.pathname.indexOf('share') > 0 ? 9 : pageData.buyingInfo.Fmode,
                        from: pageData.from,
                        founderPrice: pageData.founderPrice,
                        Fprice: pageData.buyingInfo.Fprice,
                        id: this._GetQueryString("id"),
                        shareKey: this._GetQueryString('shareKey'),
                        canUseCouon: pageData.coupons.length > 0 ? true : false,
                        needAddress: pageData.needAddress,
                        isActivity: this._GetQueryString('isactivity') ? true : false
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
                    qunQrcode: pageData.Qunlist !== null ? pageData.Qunlist.imgcontent[0] : '',
                    Fvideo: pageData.buyingInfo.Fvideo,
                    coupons: pageData.coupons,
                    couponSent: pageData.couponSent,
                    newUser: pageData.isNew === 1 ? true : false
                })
            }
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

export default IndexPage
