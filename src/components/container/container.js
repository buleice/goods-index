import React, {Component} from 'react'
import './contatiner.css'
export default class CourserContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            courseLists:this.props.courseLists
        }
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    render(){
        return(
            <div className="course-contatiner">
                <div className="courseLabel">本系列包含课程</div>
               <ul>
                   {this.state.courseLists.map((list,index)=><li key={index}><a href={`/purchase/index?id=${list.id}`} ><img src={list.img} alt="图片"/>
                       {list.haveBuy===1?(<span className='buyStatus'><img className='course-buyStatus'
                           src="//udata.youban.com/webimg/wxyx/puintuan/hasBuy.svg" alt=""/>已购</span>):(<span className='buyStatus'><img className='course-buyStatus'
                           src="//udata.youban.com/webimg/wxyx/puintuan/hasbuy.png" alt=""/>未购</span>)}
                   </a></li>)}
               </ul>
            </div>
        )
    }
}
