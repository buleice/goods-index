import React ,{Component} from 'react';
import './Danmaku.css'
export default class Danmaku extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ul className="tip_list">
                <li className="tip_box ani_tip">
                    <p><span className="name">Lucy</span> 参与了拼团</p>
                </li>
            </ul>
        )
    }
}