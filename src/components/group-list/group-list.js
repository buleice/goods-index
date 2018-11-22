import React, {Component} from 'react';
import GroupBox from '../group-box/group-box'
import './group-list.scss'

export default class GroupList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
<div>
    <div className="cover-mask"></div>
    <div className="modal layer-o">
        <div className="header">
            <span className="title">0人正在拼课</span>
            <img src="//wxyx.youban.com/img/delete.png" id="close-modal"/>
        </div>
        <div className="modal-layer-body">
            <GroupBox></GroupBox>
            <GroupBox></GroupBox>
        </div>

        <div className="footer" id="reloadbtn">
            <img id="reload" src="//wxyx.youban.com/img/rotate.svg"/>
            <label>换一批</label>
        </div>
    </div>
</div>
        )
    }
}
