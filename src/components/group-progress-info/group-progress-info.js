import React,{Component} from 'react'
import {connect} from 'react-redux';
import {backTimeArray} from '../../common/js/process'
import './group-progress-info.css'
const mapStateToProps = (state, props) => ({
    tm: state.tm,
})
class GroupProgress extends Component{
    constructor(props){
        super(props);
        this.state={
            remainTime:[],
            showInviteGuide:false,
        }
    }
    componentDidMount(){
        let endTime=this.props.progressInfo.endTime;
        const {status}=this.props.progressInfo;
        let tm=this.props.tm;
        const _this=this;
        this.timeloop = setInterval(function () {
            if (backTimeArray(endTime, tm) !==0&&status===0) {
                _this.setState({
                    remainTime: backTimeArray(endTime, tm)
                })
                tm++;
            } else {
                clearInterval(this.timeloop);
                // window.location.reload();
            }
        }, 1000)
    }
    componentWillUnmount() {
      clearInterval(this.timeloop)
      this.setState = (state, callback) => {
        return
      }
    }
    showInviteGuide(){
        this.setState({
            showInviteGuide:true
        })
        setTimeout(()=>{
            this.setState({
                showInviteGuide:false
            })
        },3000)
    }
    render(h) {
        const {leftCount,userCount,status,from}=this.props.progressInfo
        const buyingInfo=this.props.buyingInfo
        return(
            <div>
                <div className="hasJoinPeople">已有<span>{userCount}</span>参团！</div>
                <div className="timeCount">
                 {leftCount>0&& <h3>还差<span>{leftCount}人</span>，就可以一起上课了!</h3>}
                 <div>
                    <div className="hr"></div>
                    {status===0&&<div> 剩余
                        <span>{this.state.remainTime[0]}</span>:
                        <span>{this.state.remainTime[1]}</span>:
                        <span>{this.state.remainTime[2]}</span>结束</div>}
                    <div className="hr"></div>
                </div>
                </div>
                {
                    status==1 &&buyingInfo['Furl']!=''?(
                        <div className="footer">
                               <a className="shangke" href={`${buyingInfo.url}&from=${from}`}>去上课</a>
                        </div>
                    ) :null
                }{
                    status==1 && buyingInfo['Furl']==''?(
                        <div className="footer">
                            <a className="shangke" href={`/course/index?id=${buyingInfo._id.$oid}&from=${from}`}>去上课</a>
                        </div>
                    ):null
                }
                {
                    status===0&&(
                        <div className="invite">
                            <span className="yaoqing" onClick={this.showInviteGuide.bind(this)}>邀请好友</span>
                            <span className="discountAd">邀请好友，立即完成拼课</span>
                        </div>
                    )
                }{
                    this.state.showInviteGuide&&<div className="prompt2">
                    <div className="prompt2-info">
                        <span>点击右上角，邀请好友一起拼课</span>
                    </div>
                </div>
                }
                <a href="https://wxyx.youban.com/shop/index?from=detail" className="more-acourse">查看更多课程</a>
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(GroupProgress)
