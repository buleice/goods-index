import React, {Component} from 'react';
import './avatar.scss'

export default class avatarBox extends Component{
    constructor(props){
        super(props);
    }

    ComponentWithTransition(url) {
        const divStyle={
            backgroundImage: 'url(' + url + ')',
            "backgroundPosition":"center",
            "backgroundSize":"100% 100%",
            "backgroundRepeat":"no-repeat",
            "backgroundOrigin":"padding-box",
            "display":"inline-block",
            "width":"100%",
            "paddingTop":"100%",
            "borderRadius":"100%",
            "border":"1px solid #fff"
        }
        return <span style={divStyle}></span>;
      }

      addAvatar(){
            const divStyle={
                backgroundImage: 'url(/img/what@2x.png)',
                "backgroundPosition":"center",
                "backgroundSize":"100% 100%",
                "backgroundRepeat":"no-repeat",
                "backgroundOrigin":"padding-box",
                "display":"inline-block",
                "width":"100%",
                "paddingTop":"100%",
                "borderRadius":"100%",
                "border":"1px solid #fff"
            } 
            return <span style={divStyle}></span>;
      }
      createDafault(count){
        let temp=[];
        for(let i=count-1; i>0 ;i--){
            temp.push(<li key={i}><span className="default-avatar" ></span></li>)
        }
        return temp;
      }


    render(){
        const {status,limitPeople,userList}=this.props.avatarBoxInfo;
        const diference=limitPeople- userList.length;
        if(status===0){
           return(
               <div className='avatar-box'>
               	<a className='ad-link' href="/shop/index?to=bonus">
                    <img className='adImg' src="//wxyx.youban.com/img/fenxiangguangao.png" alt="图片" />
                </a>
            <div className='avatar'>
                <ul className="avatar-top">
                    {
                        userList.filter((item,index)=>index<=5).map((item,index)=>(
                            <li key={index}>
                            {this.ComponentWithTransition(item['headimg'])}
                            <span className="avater-nick">{item.nick}</span>
                            {item["isFounder"]===1&&(<span className="badges">团长</span>)}
                            </li>
                        ))   
                    }{
                      diference>0?
                      this.createDafault(diference).map((item)=>item):null  
                    }
                </ul>
            </div>
            </div>
           )
       }else{
           return (
            <div className='avatar-box'>
            <a className='ad-link' href="/shop/index?to=bonus">
                <img className='adImg' src="//wxyx.youban.com/img/fenxiangguangao.png" alt="图片" />
            </a>
            <div className='avatar'>
            <ul className="avatar-top">
                {
                    userList.filter((item,index)=>index<4).map((item,index)=>(
                        <li key={index}>
                        {this.ComponentWithTransition(item['headimg'])}
                        <span className="avater-nick">{item.nick}</span>
                        {item["isFounder"]===1&&(<span className="badges">团长</span>)}
                        </li>
                    ))   
                }{
                    userList.length===5&&(
                    <li>
                       <span className="more-icon"></span>
                    </li> 
                  )  
                }
                <li>
                    {this.ComponentWithTransition(userList.pop().headimg)} 
                    <span className="avater-nick">{userList.pop().nick}</span>
                </li>
            </ul>
        </div>
        </div>
           )
       }
    }
}