import React, {Component} from 'react';
import {Route} from "react-router-dom";
import './App.scss';
import GoodsDetail from './store/containers/views/index'
import Series from './view/series'
import Progress from './store/containers/views/progress'
import Invite from './store/containers/views/invite'
import Success from './store/containers/views/success'
const routes = [
    {
      path: "/",
      component: GoodsDetail
    },
    {
      path: "/progress",
      component: Progress,
    //   routes: [
    //     {
    //       path: "/tacos/bus",
    //       component: Bus
    //     },
    //     {
    //       path: "/tacos/cart",
    //       component: Cart
    //     }
    //   ]
    },
    {
        path: "/invite",
        component: Invite
    },
    {
        path: "/success",
        component: Success
    },
    {
        path:'/series',
        component:Series
    }
  ];
class App extends Component{
    render(){
        return(
            <div>
             <Route cache  exact path='/' component={GoodsDetail}></Route>
             <Route path='/progress' component={Progress}></Route>
             <Route path='/invite/:buyingid/:groupid' component={Invite}></Route>
             <Route path='/success/:buyingid/:groupid' component={Success}></Route>
             {/* <Route path='/series' component={Series}></Route> */}
            </div>
        )
    }
}

export default App;
