import { combineReducers } from 'redux'
import asyncReducer from './asyncReducer'
import resourceReducer from './resourceReducer'
import menuReducer from './menuReducer'
import genreReducer from './genreReducer'
import searchReducer from './searchReducer'

export default combineReducers({
    resources: resourceReducer,
    async: asyncReducer,
    menu: menuReducer,
    genres: genreReducer,
    totals: searchReducer
})