import React, { Component } from "react";
import Swiper from 'swiper/dist/js/swiper.js';
import './more-course.scss'
import 'swiper/dist/css/swiper.min.css'
// import Danmaku from '../../components/Danmaku/Danmaku'

export default class Swipers extends Component{

    componentDidMount() {
        new Swiper(this.swiperID, {
            // pagination: {
            //     el: this.paginateID,
            // },
            // autoplay: true,
            // lazy: {
            //     loadPrevNext: true,
            // },
            // speed:500,
            // loop : true,
            // paginationClickable: true,
            // spaceBetween: 30,
            // centeredSlides: true,
            // autoplayDisableOnInteraction: false,
            // disableOnInteraction: false
            lazy: {
                loadPrevNext: true,
            },
            speed:500,
            loop : true,
            autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }

        });
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    render(){
        return(
            <div className="banbox">
                <div className="wxchat-banner swiper-container">
                    <section className="new_custom swiper-container index_tab_con" ref={self => this.swiperID = self}>
                        <ul className="swiper-wrapper">
                            {this.props.lists.map(
                                (list,index)=><li className="swiper-slide" key={index}>
                                    <a href={`/purchase/index?id=${list.id}`}>
                                        <img className="swiper-img" src={list.banner[0]} alt="图片"/>
                                        <div className="mask-bottom">
                                            <div className="course-title">{list.title}</div>
                                            <div className="course-price">开团价&nbsp;
                                                <small>￥</small>
                                                <span>{list.price}</span></div>
                                        </div>
                                    </a>
                                </li>
                            )
                            }
                        </ul>
                        {/*<div className="swiper-pagination banner-pagination" ref={self => this.paginateID = self}></div>*/}
                    </section>
                </div>
            </div>
        )

    }
}
