import React,{Component} from 'react';
import './single-group.scss';
import { connect } from 'react-redux';
import {backTimeString} from '../../common/js/process'
const mapStateToProps = (state, props) => ({
    tm: state.tm
})
class SingleGroup extends Component{
    constructor(props){
        super(props);
        this.state={
            endTime:props.item.endTime,
            remainTime:'',
        }
    }
    componentDidMount(){
        let endTime=this.state.endTime;
        let _this=this;
        let tm=this.props.tm;
        setInterval(function () {
            _this.setState({
                remainTime :backTimeString(endTime,tm)
            })
            tm++;
        },1000)
    }
    render(){
        return(
            <div className="groupinfo">
                <div className="group_left">
                    <span className="avatar"><img className="uimgbox"
                                                  src={this.props.item['headimg']} alt="头像"/></span>
                    <div className="middle">
                        <h4><span className="avater-nick">{this.props.item['nick']}</span><b className="tuan_label">3人团</b>
                        </h4>
                        <div>
                            <span>还差</span><span
                            className="leftCount">{this.props.item['leftCount']}人</span><span>拼团</span> 剩余<span
                            className="time-left" data-lefttime={this.props.item['endTime']}>{this.state.remainTime}</span>
                        </div>
                    </div>
                </div>
                <a className="ulink cantuan">去拼团</a>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(SingleGroup)
