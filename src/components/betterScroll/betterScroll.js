import React, {Component} from 'react';
import {addClass} from '../../common/js/dom';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';
import './betterScroll.scss'

let silders = '';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.slide = React.createRef();
        this.slideGroup = React.createRef();
        this.video = React.createRef();
        this.state = {
            dots: [],
            currentPageIndex: 0,
            children: undefined,
        }
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
        this.refresh = this.refresh.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this._setSlideWidth = this._setSlideWidth.bind(this);
        this._initSlide = this._initSlide.bind(this);
        this._onScrollEnd = this._onScrollEnd.bind(this);
        this._initDots = this._initDots.bind(this);
        this._play = this._play.bind(this);
    }
    componentWillUnmount() {
      this.setState = (state, callback) => {
        return
      }
    }
    componentWillMount() {
        this.timer = '';
        this.resizeTimer = '';
        if (!this.carousel) {
            return
        }
        this.carousel.enable()
        let pageIndex = this.carousel.getCurrentPage().pageX
        this.carousel.goToPage(pageIndex, 0, 0)
        this.setState({
            currentPageIndex: pageIndex
        })
        if (this.props.autoPlay) {
            this._play()
        }

    }

    componentDidMount() {

        this.update();
        window.addEventListener('resize', () => {
            if (!this.carousel || !this.carousel.enabled) {
                return;
            }
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                if (this.carousel.isInTransition) {
                    this._onScrollEnd()
                } else {
                    if (this.autoPlay) {
                        this._play()
                    }
                }
                this.refresh()

            }, 60)
        })

    }

    componentWillUnmount() {
        this.carousel.disable();
        clearTimeout(this.timer);
    }

    update() {
        if (this.carousel) {
            this.carousel.destroy()
        }
        this.init()
    }

    refresh() {
        this._setSlideWidth(true)
        this.carousel.refresh()
    }

    prev() {
        this.carousel.prev()
    }

    next() {
        this.carousel.next()
    }

    init() {
        clearTimeout(this.timer)
        this.setState({
            currentPageIndex: 0
        })
        this._setSlideWidth()
        if (this.props.showDot) {
            this._initDots()
        }
        this._initSlide()
        if (this.props.autoPlay) {
            this._play()
        }
    }

    _setSlideWidth(isResize) {
        this.setState({
            children: this.slideGroup.current.children
        })
        let slideGroupChildren = this.slideGroup.current.children
        let width = 0
        let slideWidth = this.slide.current.clientWidth;
        for (let i = 0; i < slideGroupChildren.length; i++) {
            let child = slideGroupChildren[i]
            addClass(child, 'slide-item')
            child.style.width = slideWidth + 'px'
            width += slideWidth
        }
        if (this.props.loop && !isResize) {
            width += 2 * slideWidth
        }
        this.slideGroup.current.style.width = width + 'px'
    }

    _initSlide() {
        this.carousel = new BScroll('.wrapper', {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
                loop: this.props.loop,
                threshold: this.props.threshold,
                speed: this.props.speed,
                easing: {
                    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fn: function (t) {
                        return t * (2 - t)
                    }
                }
            },
            bounce: false,
            stopPropagation: true,
            click: this.props.click,
        })
        silders = this.carousel;
        this.carousel.on('scrollEnd', this._onScrollEnd)
        this.carousel.on('touchEnd', () => {
            if (this.props.autoPlay) {
                this._play()
            }
        })
        this.carousel.on('beforeScrollStart', () => {
            if (this.props.autoPlay) {
                clearTimeout(this.timer)
            }
        })
    }

    _onScrollEnd() {
        let pageIndex = this.carousel.getCurrentPage().pageX
        this.setState({
            currentPageIndex: pageIndex
        })
        if (this.props.autoPlay) {
            this._play()
        }
    }

    _initDots() {
        let str = "0123456789";
        this.setState({
            dots: str.substr(0, this.slideGroup.current.children.length).split('')
        })

    }

    _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.next()
        }, this.props.interval)
    }

    render() {
        return (
            <div className="slide-banner wrapper" ref={this.slide}>
                <div className="slide-group" ref={this.slideGroup}>
                    {this.props.slideItemData.map((item, index) => <div key={index}><img src={item}/></div>)}
                </div>
                <div className={`dots ${this.props.showDot ? 'showDots' : 'hideDots'}`}>
                    {
                        this.state.dots.map((dot, index) => <span
                            className={`dot ${this.state.currentPageIndex === index ? 'active' : ''}`}
                            key={index}></span>)
                    }
                </div>
            </div>
        )
    }

}

Carousel.proopTypes = {
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    showDot: PropTypes.bool,
    click: PropTypes.bool,
    threshold: PropTypes.number,
    speed: PropTypes.number,
}
Carousel.defaultProps = {
    loop: true,
    autoPlay: true,
    interval: 4000,
    showDot: true,
    click: true,
    threshold: 0.3,
    speed: 400,
}
export default Carousel;
