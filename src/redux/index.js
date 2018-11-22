import { createStore, combineReducers,applyMiddleware} from 'redux'
import {userReducer, itemsReducer,speaker,showMoreStatus} from './reducer'
import {setNameActionCreator,setAsyncSayActionCreator} from './action'
import {thunkMiddleware} from './middleware'


const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    speaker:speaker,
    showMoreStatus:showMoreStatus
})

var store = createStore(reducer)
// const store= finalCreateStore(reducer) //中间件

export{
  store
}


// console.log("\n", '### It starts here')
// store_0.dispatch(setNameActionCreator('bob'))
// console.log('store_0 state after initialization:', store_0.getState())
// store_0.dispatch(setAsyncSayActionCreator('Hi'))
