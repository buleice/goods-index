import React, {
  Component
} from 'react';
import './buybutton.scss';
import {
  payRequest,
  xblPay
} from "../../api/payRequest";
import PromptDialog from '../weixin-dialog/weixin-dialog'

export default class BuyButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true,
      showPromptDialog: false,
      promptTitle: '',
      promptDesc: '您可以使用奖学金免费兑换该课程，是否兑换？',
      pcancleText: '',
      okText: '',
      canUseCouon: props.buttonControl.canUseCouon
    }
  }
  componentWillUnMount() {
    this.setState = (state, callback) => {
      return;
    }
  }

  _GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return '';
  }

  afterPay(params) {
    const buyingId = this._GetQueryString('id');
    const groupid = params.groupid;

    function toSchedulPage() {
      if (params.groupid !== '' && params.groupid !== undefined) {
        this.props.history.push(`/progress/${buyingId}/${params.groupid}`)
        // window.location.href = `/purchase/detail?buyingid=${buyingId}&groupid=${params.groupid}&from=default&purchased=1`
      } else {
        this.props.history.push(`/success/${buyingId}/${params.groupid}`)
        // window.location.href = `/groupbuying/success?buyingid=${buyingId}&from=default&purchased=1`
      }
    }
    setTimeout(() => {
      if (params.activity != undefined && params.activity != null && params.activity != '') {
        params.needAddress === 1 ?
          window.location.href = `/address/index?from=index#/orderpage?activity=${params.activity}&id=${params.bid}&goodsid=${buyingId}` :
          window.location.href = '/purchase/20190218'
      } else {
        params.needAddress === 1 ?
          window.location.href = `/address/index?from=index#/orderpage?id=${params.bid}&goodsid=${buyingId}` :
          toSchedulPage();
      }
    }, 300)
  }

  processPayment(type, willPayPrice, groupid) {

    // this.props.history.push({pathname :'/success',match:{groupid:'5bf77eb6efcba418e659a0d4'}})
    let filteredCoupons = this.props.userCoupons.filter(item => {
      return willPayPrice >= item.spendMoney
    });
    if (this.state.canUseCouon && filteredCoupons.length > 0) {
      this.props.setshowCouponBuy(true);
      this.props.setCouponBuyFilter(willPayPrice);
      this.props.setBuyMode(type)
      return
    }
    let buyingid = this.props.buttonControl.id;
    let shareKey = this.props.buttonControl.shareKey;
    if (this.state.canClick) {
      this.setState({
        canClick: false
      })
      setTimeout(() => {
        this.setState({
          canClick: true
        })
      }, 2000)
      if (Number(this.props.buttonControl.founderPrice) > 0) {
        switch (type) {
          case 0: //非免费参团
            payRequest.join('/pay/weixin/group/prepare.json', {
              shareKey: shareKey,
              buyingid: buyingid,
              groupid: groupid
            }).then(res => {
              this.afterPay(res)
            }).catch(err => {
              window.alert("支付失败")
            });
            break;
          case 1: //非免费开团
            payRequest.found('/pay/weixin/group/prepare.json', {
              shareKey: shareKey,
              buyingid: buyingid,
              urltag: window.location.pathname.indexOf('share') < 0 ? 'wxyx_groupbuying_1' : 'wxyx_groupbuying_share'
            }).then(res => {
              this.afterPay(res)
            }).catch(err => {
              console.log(err)
              window.alert("支付失败")
            });
            // wxPays.found('/pay/weixin/group/prepare.json', {shareKey: shareKey, buyingid: buyingid});
            break;
          case 5: //直接单独购买付款
            payRequest.justPay('/pay/weixin/youxue/prepare.json', {
              shareKey: shareKey,
              buyingid: buyingid
            }).then(res => {
              this.afterPay(res)
            }).catch(err => {
              console.log(err)
              window.alert("支付失败")
            });
            // wxPays.justPay('/pay/weixin/youxue/prepare.json', {shareKey: shareKey, buyingid: buyingid});
            break;
          case 6: //使用奖学金原价兑换
            xblPay.bonusPay('/bonus/consume.json', {
              id: buyingid
            }).then(res => {
              this.afterPay(res)
            }).catch(err => {
              console.log(err)
              window.alert("兑换失败")
            });
            // wxPays.bonusPay('/bonus/consume.json', {id: buyingid});
            break;
          case 99: //通过运营活动直接购买
            payRequest.AJoinPay('/pay/weixin/youxue/prepare.json', {
              shareKey: shareKey,
              buyingid: buyingid
            }).then(res => {
              this.afterPay(Object.assign({}, res, {
                activity: 20190218
              }))
            }).catch(err => {
              console.log(err)
              window.alert("支付失败")
            });
            break;
          case 7: //非免费参团
            payRequest.join('/pay/weixin/group/prepare.json', {
              buyingid: buyingid,
              groupid: groupid,
              shareKey: shareKey
            }).then(res => {
              this.afterPay(res)
            }).catch(err => {
              console.log(err)
            });
            break;
          default:
            return false;
        }
      } else {
        switch (type) {
          case 7: //免费参团
            xblPay.freeJoin('/groupbuying/freejoin.json', {
                buyingid: buyingid,
                groupid: groupid
              })
              .then(res => {
                this.props.history.push(`/progress/${buyingid}/${groupid}`)
              }).catch(err => {
                window.alert(err.msg)
              });
            break;
          case 1:
            xblPay.freeFound('/groupbuying/freejoin.json', {
              buyingid: buyingid
            }).then(res => {
              let buyingId = this.props.buttonControl.id;
              if (res.groupid !== '' && res.groupid !== undefined) {
                this.props.history.push(`/progress/${buyingId}/${res.groupid}`)
                // window.location.href = `/purchase/detail?buyingid=${buyingId}&groupid=${res.groupid}&from=default&purchased=1`
              } else {
                this.props.history.push(`/success/${buyingId}`)
                // window.location.href = `/groupbuying/success?buyingid=${buyingId}&from=default&purchased=1`;
              }
            }).catch(err => {
              window.alert(err.msg)
            });
            break;
          default:
            return false;

        }
      }
    } else {
      return false
    }
  }

  dandugou(willPayPrice) {
    let filteredCoupons = this.props.userCoupons.filter(item => {
      return willPayPrice >= item.spendMoney
    });
    if (this.state.canUseCouon && filteredCoupons.length > 0) {
      this.props.setshowCouponBuy(true);
      this.props.setCouponBuyFilter(willPayPrice);
      this.props.setBuyMode(5)
      return
    }
    let buyingid = this.props.buttonControl.id
    let shareKey = this.props.buttonControl.shareKey
    payRequest.justPay('/pay/weixin/youxue/prepare.json', {
      shareKey: shareKey,
      buyingid: buyingid
    }).then(res => {
      this.afterPay(res)
    }).catch(err => {
      console.log(err)
      window.alert("支付失败")
    })
  }

  render() {
    if (this.props.buttonControl.isActivity) {
      return ( <
        div className = "buttons" >
        <
        div className = "btn_left" >
        <
        a className = "toindex"
        href = {
          `/shop/default?from= ${this.props.buttonControl.from}`
        } > 《
        更多拼团 < /a> < /
        div > <
        div className = "dandugou" >
        <
        div className = "inline-box"
        onClick = {
          this.processPayment.bind(this, 99, this.props.buttonControl.Fprice)
        } >
        <
        span > 去购买 < /span><span
        className = " sub" > ￥ < /span><span>{this.props.buttonControl.Fprice}</span >
        <
        /div> < /
        div > <
        /div>
      )
    } else {
      return ( <
        div > {
          (() => {
            switch (this.props.buttonControl.Fmode) {
              case 1:
                return ( <
                  div className = "buttons" >
                  <
                  div className = "btn_left" >
                  <
                  a className = "toindex"
                  href = {
                    `/shop/default?from= ${this.props.buttonControl.from}`
                  } > 《
                  更多拼团 < /a> < /
                  div > <
                  div className = "dandugou" >
                  <
                  div className = "inline-box"
                  onClick = {
                    this.dandugou.bind(this, this.props.buttonControl.ForiginalPrice)
                  } >
                  <
                  span > 去购买 < /span><span
                  className = " sub" > ￥ < /span><span>{this.props.buttonControl.ForiginalPrice}</span >
                  <
                  /div> < /
                  div > <
                  /div>
                );
              case 9:
                return ( <
                  div className = "buttons" >
                  <
                  div className = "single-button"
                  onClick = {
                    this.processPayment.bind(this, 1, this.props.buttonControl.founderPrice)
                  } >
                  <
                  div className = " inline-box" >
                  <
                  span > 马上开团 < /span> <
                  span className = "sub" > < /span><span
                  id = " special_price" > < /span> < /
                  div > <
                  /div> < /
                  div >
                );
              case "invite":
                return ( <
                  div className = "buttons-buy" >
                  <
                  li className = "kaituan"
                  onClick = {
                    this.processPayment.bind(this, 1, this.props.buttonControl.founderPrice)
                  } > {
                    this.props.buttonControl.buttonText
                  } <
                  /li> <
                  li className = "cantuan"
                  onClick = {
                    this.processPayment.bind(this, 1, this.props.buttonControl.founderPrice, this.props.buttonControl.groupid)
                  } >
                  参团 <
                  /li>
                  <
                  /div>
                );
              default:
                return ( <
                  div >
                  <
                  PromptDialog promptDesc = {
                    this.state.promptDesc
                  }
                  showPromptDialog = {
                    this.state.showPromptDialog
                  }
                  delPOk = {
                    this.delPOk.bind(this)
                  }
                  delPCancle = {
                    this.delPCancle.bind(this)
                  } > < /PromptDialog> <
                  div className = " buttons" >
                  <
                  div className = " btn_left" > < a className = " toindex"
                  href = " /
                  shop / index ? from =
                  default ">《 更多拼团</a></div> <
                  div className = " b-btn" >

                  {
                    this.props.buttonControl.bonusPay === 1 && Number(this.props.buttonControl.founderPrice) > 0 ?
                    ( < div className = " dandugou" >
                      <
                      div className = " inline-box"
                      onClick = {
                        this.delBonusExchange.bind(this)
                      } >
                      <
                      span > 奖学金兑换 < /span></div >
                      <
                      /div>): ( < div className = " dandugou"
                      onClick = {
                        this.dandugou.bind(this, this.props.buttonControl.ForiginalPrice)
                      } >
                      <
                      div className = " inline-box" > < span > 单独购买: < /span><span
                      className = " sub" > ￥ < /span><span>{this.props.buttonControl.ForiginalPrice}</span >
                      <
                      /div> < /
                      div > )
                  }

                  <
                  div className = "sanrentuan"
                  onClick = {
                    this.processPayment.bind(this, 1, this.props.buttonControl.founderPrice)
                  } >
                  <
                  div className = " inline-box" >
                  <
                  span > {
                    this.props.buttonControl.buttonText
                  } < /span> <
                  span className = "sub" > ￥ < /span><span
                  id = " special_price" > {
                    this.props.buttonControl.founderPrice
                  } < /span> < /
                  div > <
                  /div> < /
                  div > <
                  /div> < /
                  div >
                )
            }
          })()
        } <
        /div>
      )
    }

  }

  delPOk() {
    this.setState({
      showPromptDialog: false
    })
    xblPay.bonusPay('/bonus/consume.json', {
      id: this.props.buttonControl.id
    }).then(res => {
      this.afterPay(res)
    })
  }

  delPCancle() {
    this.setState({
      showPromptDialog: false
    })
  }

  delBonusExchange() {
    this.setState({
      showPromptDialog: true
    })
  }
}
