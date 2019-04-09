import React,{Component} from 'react';
import './toTop.css'
const dpr = window.devicePixelRatio || 1;
 class ScrollTo extends Component{
  constructor(props){
    super(props);
    this. _throttle=this. _throttle.bind(this)
      this._scrollFunction=this._scrollFunction.bind(this)
      this._topFunction=this._topFunction.bind(this)
      this.state={
      show:false
      }
  }
  componentDidMount(){
      let _this=this
      window.addEventListener('scroll', this._throttle(function() {
          _this._scrollFunction();
      }));
  }
  render(){
    return(
        <div  className={`sc-htoDjs iOMeRW ${this.state.show? 'show' : 'hide' }`} id='myBtn' onClick={this._topFunction}><span className="iconfont"></span>顶部</div>
    )
  }
    _throttle(action) {
        var isRunning = false;
        return function() {
            if (isRunning)
                return;
            isRunning = true;
            window.requestAnimationFrame(function() {
                action();
                isRunning = false;
            });
        };
    }
    _scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
           this.setState({
               show:true
           })
        } else {
            this.setState({
                show:false
            })
        }
    }
    _topFunction() {
          // console.log(this.props)
          // this.props.dispatch(actionCreators.setNameActionCreator("dylan"))
        let _this=this
        cancelAnimationFrame(this.timer);
        this.timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                window.scrollTo(0, oTop - 100*dpr);
                _this.timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(_this.timer);
            }
        });
    }
}

export default ScrollTo
