import React, {Component} from 'react';
import './weixin-dialog.scss';
import PropTypes from 'prop-types';
import Carousel from "../betterScroll/betterScroll";

class PromptDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.showPromptDialog ? (<div className={'prompt-dialog'}>
                <div className='weui-mask'></div>
                <div className='weui-dialog'>
                    <div className='weui-dialog__hd'><strong className='weui-dialog__title'>{this.props.promptTitle}</strong>
                    </div>
                    <div className='weui-dialog__bd'>{this.props.promptDesc}</div>
                    <div className='weui-dialog__ft'>
                        <a className='weui-dialog__btn weui-dialog__btn_default' onClick={this.props.delPCancle} >{this.props.cancleText}</a>
                        <a className='weui-dialog__btn weui-dialog__btn_primary' onClick={this.props.delPOk}>{this.props.okText}</a>
                    </div>
                </div>
            </div>) : null
        )
    }
}
// PromptDialog.proopTypes = {
//     loop: PropTypes.bool,
//     autoPlay: PropTypes.bool,
//     interval: PropTypes.number,
//     showDot: PropTypes.bool,
//     click: PropTypes.bool,
//     threshold: PropTypes.number,
//     speed: PropTypes.number,
// }
PromptDialog.defaultProps = {
    promptTitle:'温馨提示',
    cancleText: '取消',
    okText: '确定',
}

export default PromptDialog
