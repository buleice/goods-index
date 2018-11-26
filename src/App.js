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
import BuyButtons from './components/buy-buttons/buy-buttons'
import {connect} from 'react-redux';
import {groupData, SetTm,freeBuy} from './actions/index'

const mapDispatchToProps = dispatch => ({
    setTm: tm => dispatch(SetTm(tm)),
    setGroups: data => dispatch(groupData(data)),
    setFreeBuy:isFree=>dispatch(freeBuy(isFree))
})


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
                this.props.dispatch(SetTm(pageData.tm))
                this.props.dispatch(groupData(pageData.userList))
                this.props.dispatch(freeBuy(isBuy));
                this.setState({
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
                        buttonText: pageData.buyingInfo.buttonText,
                        Fmode: pageData.buyingInfo.Fmode,
                        from: pageData.from,
                        founderPrice: pageData.founderPrice,
                        id:this._GetQueryString("id"),
                        shareKey:this._GetQueryString('shareKey'),
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
                    }
                })
            }
        })
    }

    render() {
        if (this.state.isRender) {
            return (
                <div className="App">
                    <Carousel slideItemData={this.state.goodInfo.buyingInfo.Fbanner}></Carousel>
                    <GoodInfo goodInfo={this.state.goodInfoData}></GoodInfo>
                    <PeopleInGroup peopleInGroup={this.state.peopleInGroup}></PeopleInGroup>
                    <GuiZe></GuiZe>
                    <GroupList groupList={this.state.groupList}></GroupList>
                    <MoreCourse lists={this.state.recommend}></MoreCourse>
                    <ProductsInfo Fintros={this.state.Fintros}></ProductsInfo>
                    <BuyButtons buttonControl={this.state.buttonControl}></BuyButtons>
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

export default connect(
    // mapStateToProps,
    mapDispatchToProps
)(App)
// export default App;
