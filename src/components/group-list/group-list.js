import React, {Component} from 'react';
import GroupBox from '../group-box/group-box';
import axios from 'axios'
import './group-list.scss'
import {wxPays} from "../../common/js/wxpay";

export default class GroupList extends Component {
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
        axios.get(`/purchase/index.json?id=${this.props.groupList.id}&page=${this.state.pageNum+1}`).then(res=>{
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

        return (
            <div>
                <div className={this.props.showMoreGroup ? 'show-cover-mask' : 'hide-cover-mask'}
                     onClick={()=>this.props.onShowMoreGroupClick(false)}></div>
                <div className={this.props.showMoreGroup ? 'show-modal' : 'hide-modal'}>
                    <div className="header">
                        <span className="title">{this.props.groupList.nowBuyingCount}人正在拼课</span>
                        <img onClick={()=>this.props.onShowMoreGroupClick(false)} src="//wxyx.youban.com/img/delete.png" id="close-modal"/>
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
            </div>
        )
    }
}
