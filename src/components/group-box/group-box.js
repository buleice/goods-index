import React, {Component} from 'react';
import './group-box.scss';
import SingleGroup from '../single-group/single-group'

export default class GroupBox extends Component {
    render() {
        return (
            <div>
                {this.props.Fmode !== 1 ? (this.props.userList.map((item, index) =><SingleGroup item={item} Fmode={this.props.Fmode} key={index}></SingleGroup>)):null}
            </div>
        )
    }
}
