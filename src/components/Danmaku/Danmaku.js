import React ,{Component} from 'react';
import './Danmaku.scss'
export default class Danmaku extends Component{
    constructor(props){
        super(props)
        this.state={
            messageList:props.messageList,
            showDanMaku:false,
            danmakuText:'',
        }
    }
    componentWillUnmount() {
      clearInterval(this.timer)
      this.setState = (state, callback) => {
        return
      }
    }
    componentDidMount(){
        if (this.state.messageList.length > 0) {
            let initIndex=0;
          this.timer=setInterval(() => {
            this.setState({
                danmakuText:this.state.messageList[initIndex]
            })
              initIndex++;
              if (initIndex>=this.state.messageList.length) {
                initIndex=0;
              }
            }, 4000)
          }
        }
    render(){
        return(
            <ul className="tip_list">
                <li className="tip_box ani_tip">
                    <p dangerouslySetInnerHTML={{__html: this.state.danmakuText}}></p>
                </li>
            </ul>
        )
    }
}
