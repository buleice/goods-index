import React, {Component} from 'react'
import './products-introduction.css'

export default class ProductsInfo extends Component{
    constructor(props){
        super(props);
        this.state={
          intro:0
        }
    }
    handleClick(index){
      this.setState({
          intro:index
      })
    }
    render(){
        const Fintro1='<p><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583675_15bc42ebb972a2.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583678_15bc42ebe441bc.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583680_15bc42ec09fa7e.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583807_15bc42f3f40a7c.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583837_15bc42f5de58d4.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583840_15bc42f607650d.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583842_15bc42f62b19e7.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583844_15bc42f64bbb9a.png"/><img title="" alt="" src="http://wxxbl.oss-cn-shenzhen.aliyuncs.com/busy/2018-10-15/1539583846_15bc42f66e9758.png"/></p>'
        return(
            <div>
                {this.props.Fintros[2]!=='' && (<nav className="nav" id="nav"><ul className="con">
                    <li onClick={this.handleClick.bind(this, 0)}><a className={this.state.intro===0?'chosen':''} href="#intro__item__01">课程介绍 </a></li>
                    <li onClick={this.handleClick.bind(this, 1)}><a className={this.state.intro===1?'chosen':''} href="#intro__item__02">课程列表</a></li>
                    <li onClick={this.handleClick.bind(this, 2)}><a className={this.state.intro===2?'chosen':''} href="#intro__item__03">用户评价</a></li>
                </ul></nav>)}

                <div className="introduction">
                    <div id="intro__item__01" dangerouslySetInnerHTML={{__html:this.props.Fintros[0]}}></div>
                    <div id="intro__item__02" dangerouslySetInnerHTML={{__html:this.props.Fintros[1]}}></div>
                    <div id="intro__item__01" dangerouslySetInnerHTML={{__html:this.props.Fintros[2]}}></div>
                </div>
            </div>
        )
    }
}
