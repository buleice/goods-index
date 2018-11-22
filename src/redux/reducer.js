var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

var speaker= function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)
        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state
        }
    }
const showMoreStatus=(state = {}, action)=>{
    switch (action.type) {
        case 'SET_SHOWMORE':
            return {
                ...state,
                showStatus: action.showStatus
            }
        default:
            return state;
    }
}
export{
  userReducer,
  itemsReducer,
  speaker,
    showMoreStatus
}
