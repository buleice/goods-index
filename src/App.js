import React, {Component} from 'react';
import {Route} from "react-router-dom";
import loadable from '@loadable/component'
import Loading from "./components/loading/loading";
import './App.scss';

const GoodsDetail=  loadable(() => import('./store/containers/views/index'), {
    fallback: Loading,
  })
  const Series=  loadable(() => import('./view/series'), {
    fallback: Loading,
  })
  const Progress=  loadable(() => import('./store/containers/views/progress'), {
    fallback: Loading,
  })
  const Invite=  loadable(() => import('./store/containers/views/invite'), {
    fallback: Loading,
  })
  const Success=  loadable(() => import('./store/containers/views/success'), {
    fallback: Loading,
  })
// import GoodsDetail from './store/containers/views/index'
// import Series from './view/series'
// import Progress from './store/containers/views/progress'
// import Invite from './store/containers/views/invite'
// import Success from './store/containers/views/success'
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
             <Route cache  exact path='/purchase/index' component={GoodsDetail}></Route>
             <Route path='/purchase/index/progress' component={Progress}></Route>
             <Route path='/purchase/index/invite/:buyingid/:groupid' component={Invite}></Route>
             <Route path='/purchase/index/success/:buyingid/:groupid' component={Success}></Route>
             <Route component={GoodsDetail} />
             {/* <Route path='/series' component={Series}></Route> */}
            </div>
        )
    }
}

export default App;
