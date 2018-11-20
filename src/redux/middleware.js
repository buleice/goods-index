var thunkMiddleware = function ({ dispatch, getState }) {
    // console.log('Enter thunkMiddleware');
    return function(next) {
        // console.log('Function "next" provided:', next);
        return function (action) {
            // console.log('Handling action:', action);
            return typeof action === 'function' ?
                action(dispatch, getState) :
                next(action)
        }
    }
}

// var thunkMiddleware = curry(
//        ({dispatch, getState}, next, action) => (
//            // 你的中间件业务相关代码
//         typeof action === 'function' ?
//                action(dispatch, getState) :
//                next(action)
//        )
//    );

export{
  thunkMiddleware
}
