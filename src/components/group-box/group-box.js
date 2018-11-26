import React, {Component} from 'react';
import './group-box.scss';
import SingleGroup from '../single-group/single-group'

export default class GroupBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.Fmode !== 1 ? (this.props.userList.map((item, index) =><SingleGroup item={item} key={index}></SingleGroup>)):null}
            </div>
        )
    }
}
