import React, {Component} from 'react';
import GroupBox from '../group-box/group-box';
import './group-list.scss'
import Transition from 'react-transition-group/Transition';
import {getMoreGroup} from '../../api/requestApis'

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state={
            loadMoreGroup:false,
            pageNum:1,
            showLoading:false
        }
    }
    reloadGroupData(){
        this.setState({
            loadMoreGroup:true
        })
        getMoreGroup(this.props.groupList.id,this.state.pageNum+1).then(res=>{
            if(res.data.userList.length>0){
                this.setState({
                    pageNum:this.state.pageNum+1
                })
                this.props.setGroups(res.data.userList)
            }else{
                this.setState({
                    pageNum:1
                })
                this.setState({
                    loadMoreGroup:false
                })
            }
            setTimeout(()=>{
                this.setState({
                    loadMoreGroup:false
                })
            },300)
        })
    }

    render() {
        const duration=300;
        return (
            <div>
                <div className={this.props.showMoreGroup ? 'show-cover-mask' : 'hide-cover-mask'} onClick={()=>{this.props.setModalOpen(false);this.props.onShowMoreGroupClick(false)}}></div>
                <Transition in={this.props.showMoreGroup} timeout={duration}>
                    {status=>(
                        <div className={`slide slide-${status}`}>
                            <div className="header">
                                <span className="title">{this.props.groupList.nowBuyingCount}人正在拼课</span>
                                <img  onClick={()=>{this.props.setModalOpen(false);this.props.onShowMoreGroupClick(false)}} src="//wxyx.youban.com/img/delete.png" id="close-modal"/>
                            </div>
                            <div className="modal-layer-body">
                                {this.state.loadMoreGroup? <div className="loader">
                                    <div className="square"></div>
                                    <div className="square"></div>
                                    <div className="square last"></div>
                                    <div className="square clear"></div>
                                    <div className="square"></div>
                                    <div className="square last"></div>
                                    <div className="square clear"></div>
                                    <div className="square "></div>
                                    <div className="square last"></div>
                                </div> :<GroupBox Fmode={this.props.groupList.Fmode} userList={this.props.groupData}></GroupBox>}
                            </div>

                            <div onClick={()=>this.reloadGroupData()} className="footer " >
                                <img className={this.state.loadMoreGroup?'footer-rotate':''} src="//wxyx.youban.com/img/rotate.svg"/>
                                <label>换一批</label>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        )
    }
}

export default GroupList
