import React, {Component} from 'react';
const lockedList = new Set();

class LockScroll {
    constructor(props){
        this.lock=props.lock;
    }
    lock(){

    }
    unlock(){

    }
}
export default class ScrollFix extends Component{
    constructor(props){
        super(props);
    }
    lock() {
        lockedList.add(this);
// 省略其他逻辑
    }

    unlock() {
        lockedList.delete(this);
        if (lockedList.size <= 0) {
            this.destroy();
        }
    }
    componentDidMount() {
        const opts = this.props.selector ?
            {selector: this.props.selector}
            : undefined;
        this.lockScroll = new LockScroll(opts);
        this.updateScrollFix();
    }

    updateScrollFix() {
        const {lock} = this.props;
        if (lock) {
            this.lockScroll.lock();
        }
        else {
            this.lockScroll.unlock();
        }
    }

    componentDidUpdate(prevProps: ScrollFixProps) {
        if (prevProps.lock !== this.props.lock) {
            this.updateScrollFix();
        }
    }
    componentWillUnmount() {
        console.log('scrollfix component will unmount!');
        this.lockScroll.unlock();
    }
    render(){
        return(
            <div></div>
        )
    }
}
