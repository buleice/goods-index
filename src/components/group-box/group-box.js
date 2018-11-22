import React, {Component} from 'react';
import './group-box.scss';

export default class GroupBox extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                {this.props.Fmode !== 1 ? (this.props.userList.map((item, index) => <div className="groupinfo"
                                                                                         key={index}>
                    <div className="group_left">
                    <span className="avatar"><img className="uimgbox"
                                                  src={item['headimg']}/></span>
                        <div className="middle">
                            <h4><span className="avater-nick">{item['nick']}</span><b className="tuan_label">3人团</b>
                            </h4>
                            <div>
                                <span>还差</span><span
                                className="leftCount">{item['leftCount']}人</span><span>拼团</span> 剩余<span
                                className="time-left" data-lefttime={item['endTime']}>{item['endTime']}</span>
                            </div>
                        </div>
                    </div>
                    <a className="ulink cantuan" data-groupid="20181121182610x118e566106f">去拼团</a>
                </div>)) : null}
            </div>
        )
    }
}
