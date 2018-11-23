import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import tm from './tm'
import {showGuide, showMoreGroup} from './showstatus'
export default combineReducers({
    todos,
    visibilityFilter,
    tm,
    showGuide,
    showMoreGroup
})
