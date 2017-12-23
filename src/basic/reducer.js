import { combineReducers } from 'redux'
import {reducer as listReducer} from '../page/new/Index'
import {reducer as detailReducer} from '../page/newdetail/Index'

export default combineReducers({
    list:listReducer,
    detail:detailReducer
})
    