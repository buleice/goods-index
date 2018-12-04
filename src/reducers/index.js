import {combineReducers} from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import tm from './tm'
import {showGuide, showMoreGroup,modalOpen} from './showstatus'
import groups from './groupData'
import freeBuy from './freeBuy'
export default combineReducers({
    todos,
    visibilityFilter,
    tm,
    showGuide,
    showMoreGroup,
    groups,
    freeBuy,
    modalOpen
})
