
import * as types from './action-types';
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const SetTm=tm=>({
    type:types.SET_TM,
    tm:tm
})

export const showGuide=isShowGuide=>({
    type:types.SET_SHOWGUIDE,
    showGuide:isShowGuide
})

export const showMoreGroup=isShowMoreGroup=>({
    type:types.SET_SHOWMOREGROUP,
    showMoreGroup:isShowMoreGroup
})
