import React, {Component} from 'react';
import GroupBox from '../group-box/group-box';
import axios from 'axios'
import './group-list.scss'
import {wxPays} from "../../common/js/wxpay";
import Transition from 'react-transition-group/Transition';

//自己简单的封装了一个，该有的参数都由了，可以自行粘贴在自己的代码里面去试试。
class Fade extends React.Component {
    constructor(props) {
        super(props);
    }
    done =() => {
        // console.log('结束了')
    }
    addaddEndListener = (node) => { //原生时间transition运动的事件
        node.addEventListener('transitionend', this.done, false);
    }

    // 三个进入状态的事件，可以做你想做的事情
    onEnter = (node, isAppearing) => {
        console.log(isAppearing, 'onEnter')
    }
    onEntering = (node, isAppearing) => {
        console.log(isAppearing, 'onEntering')
    }
    onEntered = (node, isAppearing) => {
        console.log(isAppearing, 'onEntered')
    }

    // 三个退出的状态的事件
    onExit = (node) => {
        console.log('onExit')
    }
    onExiting = () => {
        console.log('onExiting')
    }
    onExited = () => {
        console.log('onExited')
        this.props.self()
    }
    render() {
        const { in: inProp, dur} = this.props;
        const defaultStyle = {
            transition: `transform ${300}ms ease-in-out, opacity ${300}ms ease-in-out`,
            transform: 'translateX(100px)',
            opacity: '0'
        }

        const transitionStyles = {
            entering: { transform: 'translateX(100px)', opacity: '0'},
            entered:  { transform: 'translateX(0px)', opacity: '1' },
            exiting: {transform: 'translateX(0px)', opacity: '1'},
            exited: {transform: 'translateX(0px)', opacity: '0'}
        };
        const duration = {
            enter: 300,
            exit: 300,
        }
        // 上面的都是基本参数，样式的转变以及时间的设定，具体的可以看官网文档
        // 样式也可以写成className 例如<MyComponent className={`fade fade-${status}`} />
        return (
            <Transition
                onEnter={this.onEnter}
                onEntering={this.onEntering}
                onEntered={this.onEntered}

                onExit={this.onExit}
                onExiting={this.onExiting}
                onExited={this.onExited}

                addEndListener={this.addaddEndListener}
                in={inProp}
                unmountOnExit={false} // 为true 代表退出的时候移除dom
                appear={true} // 为true  渲染的时候就直接执行动画，默认false，
                timeout={duration}
            >
                {
                    state => {
                        console.log(state, '###') //你可以很直观的看到组件加载和卸载时候的状态
                        return(
                            <div style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                {this.props.children}
                            </div>
                        )
                    }
                }
            </Transition>
        );
    }
}

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
