import React, {Component} from 'react';
import {axiosPost} from "./common/js/axiosData";
import axios from 'axios';
import './App.css';
import Carousel from './components/betterScroll/betterScroll';
import GoodInfo from './components/goodInfo/goodInfo';
import ProductsInfo from './components/products-introduction/products-introduction';
import MoreCourse from './components/more-course/more-course'

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
                    recommend:pageData.recommend,
                    Fintros:[res.data.buyingInfo.Fintro1,res.data.buyingInfo.Fintro2,res.data.buyingInfo.Fintro3],
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
                    <MoreCourse lists={this.state.recommend}></MoreCourse>
                    <ProductsInfo Fintros={this.state.Fintros}></ProductsInfo>


                </div>
            );
        } else {
            return (<div className="loading-mask" id="loadingDiv">
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

export default App;
