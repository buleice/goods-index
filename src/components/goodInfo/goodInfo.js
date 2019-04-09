import React,{Component} from 'react'
import bonusIcon from '../../asserts/bonusicon.png'
// const bonusIcon=require('../../asserts/bonusicon.png')
import './goodInfo.css'
export default class GoodInfo extends Component{
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
    render(){
        return(
            <div className="sad-banner">
                <div className="title">
                    <span><span dangerouslySetInnerHTML={{__html:this.props.goodInfo.Ftitle}}></span></span>
                </div>
                <div>
                    <p dangerouslySetInnerHTML={{__html:this.props.goodInfo.Fsubtitle}}></p></div>
                    {
                        this.props.showLine3 &&(
                            <div className="goodInfo-div">
                                <span   className={`price ${this.props.goodInfo.buyPrice===0? 'price-hidden':''}`}>￥<strong>{this.props.goodInfo.Fprice}</strong><span
                                    className="sup">现价</span></span>
                                <span className="originprice"><span>原价</span><del className="del">￥{this.props.goodInfo.ForiginalPrice}</del></span> <span id="tag">已有{this.props.goodInfo.Fsales}人购买</span>
                            </div>
                        )
                    }
                {this.props.goodInfo.hasBonus===1&&<a href={`/groupbuying/poster?shareKey=${this.props.goodInfo.shareKey}&id=${this.props.goodInfo.id}`} className='bonus_entry'><div><span>分享课程</span><span>最高赚&yen;{this.props.goodInfo.Fbonus}</span></div></a>}

                {/*<img src={bonusIcon} alt=""/>*/}
            </div>
        )
    }
}
