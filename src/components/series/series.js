import React, {Component} from 'react'
import CSSModules from 'react-css-modules';

import styles from './series.css'

class Series extends Component{
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
render(){
        return(
            <div>
                <div onClick={this.props.changeParentStatus} className={`weui_mask ${this.props.show?"show_mask":"hide_mask"}`}></div>
                <div className={`series-container ${this.props.show? "show-list" : "hide-list" }`} >
                    <div className="header">
                        {this.props.save>0 && (<span className="title">系列课程可节省：￥{this.props.save}</span>)}
                        <img src="//wxyx.youban.com/img/delete.png" onClick={this.props.changeParentStatus} id="close-button-t"/>
                    </div>
                    <ul className="series-body">
                        {
                            this.props.FgoodsList.map((goods,index)=><li className="single-course" key={index}>
                                <img className="course-img" src={goods.img} alt="图片"/>
                                <div className="course-other">
                                    <div>
                                        <b>{goods.title}</b>
                                        <div className="pintuanjia">系列购价格:<span className={`rmb ${goods.haveBuy===1? 'line-through':''}`} >￥</span><span className={`rmb-price ${goods.haveBuy===1? 'line-through':''}`}>{goods.price}</span></div>
                                    </div>
                                    {goods.haveBuy===0? (<div><img className="course-buyStatus" src="//udata.youban.com/webimg/wxyx/puintuan/hasbuy.png" alt=""/></div>):(<div><span className="hasBought">已购买</span></div>) }
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default CSSModules(Series, styles);
