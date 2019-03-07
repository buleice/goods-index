import React, {Component} from 'react'
import './products-introduction.css'

export default class ProductsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: 0,
            sayHello:false
        }
    }

    handleClick(index) {
        this.setState({
            intro: index
        })
    }

    render() {
        return (
            <div>
                {this.props.Fvideo !== "" && (<nav className="nav" id="nav">
                    <ul className="con">
                        <li onClick={this.handleClick.bind(this, 0)} className={this.state.intro === 0 ? 'chosen' : ''}>
                            <a className={this.state.intro === 0 ? 'chosen' : ''}>课程介绍 </a></li>
                        <li onClick={this.handleClick.bind(this, 1)} className={this.state.intro === 1 ? 'chosen' : ''}>
                            <a className={this.state.intro === 1 ? 'chosen' : ''}>免费体验</a></li>
                    </ul>
                </nav>)}
                {this.state.intro === 0 ? (<div className="introduction">
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[0]}}></div>
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[1]}}></div>
                    <div dangerouslySetInnerHTML={{__html: this.props.Fintros[2]}}></div>
                    {this.props.qunQrcode !== '' && <div className="qunqrcode">
                        <div className="qunqrcodeMain">
                            <h3>加入小伴龙优学群<br/>和群友们一起拼团得实惠~</h3>
                            <img src={this.props.qunQrcode} alt="加入小伴龙优学群"/>
                            <p>识别二维码，加群一起拼吧~</p>
                        </div>
                    </div>}
                </div>) : (
                    <div className="experience">
                        <video src={this.props.Fvideo}
                               x5-playsinline=""
                               webkit-playsinline="" playsInline=""  preload="auto" autoplay
                               controls="controls" poster={`${this.props.Fvideo}?vframe/jpg/offset/24/w/375/h/180`}></video>
                    </div>
                )}
            </div>
        )
    }
}
