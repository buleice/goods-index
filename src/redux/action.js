import * as types from './actionTypes.js';
var setNameActionCreator = function (name) {
    return {
        type: types.SET_NAME,
        name: name
    }
}

var addItemActionCreator=function(item){
  return{
    type:types.ADD_ITEM,
    item:item
  }
}

var setAsyncSayActionCreator=function(){
  return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message:''
            })
        }, 2000)
    }
}

export{
  setNameActionCreator,
  setAsyncSayActionCreator,
  addItemActionCreator
}
