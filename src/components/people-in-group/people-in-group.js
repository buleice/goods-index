import React, {Component} from "react";
import './people-in-group.scss'
import GroupBox from "../group-box/group-box";
import { connect } from 'react-redux';
import {showMoreGroup} from "../../actions";
const mapStateToProps = state => ({
    showStatus: state.showMoreGroup
})
const mapDispatchToProps = dispatch => ({
    showMoreGroup: isShowGuide => dispatch(showMoreGroup(isShowGuide))
})
class PeopleInGroup extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div className="pinke-block">
                <div className="block-top">
                    <div className="le">
                        {this.props.peopleInGroup.nowBuyingCount}人正在拼课
                    </div>
                    <div className="six-avatar">
                        {Object.values(this.props.peopleInGroup.recent).map((item,index)=> <img src={item} alt="" key={index}/>)}
                        <span className="dot">···</span>
                    </div>
                    <div className="ri" >
                        <span>更多</span>
                    </div>
                </div>
                <GroupBox userList={this.props.peopleInGroup.userList.slice(0,2)} Fmode={this.props.peopleInGroup.Fmode}></GroupBox>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleInGroup)
