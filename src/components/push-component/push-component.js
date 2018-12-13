import React,{Component} from 'react';
import './push-component.scss';

export default class AdPush extends Component{
    constructor(props){
        super(props);
        this.state={
            showAd:true
        }
    }
    render(){
        return(
            <div>
                {this.state.showAd&&this.props.couponSent.length>0?(
                    <div className={"couponSent"} onClick={()=>{this.setState({showAd:false})}}>
                        <p>恭喜你获得了{this.props.couponSent.length}张优惠券</p>
                    </div>
                ):null}
            </div>
        )
    }
}
