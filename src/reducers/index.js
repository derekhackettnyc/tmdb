import { combineReducers } from 'redux'
import asyncReducer from './asyncReducer'
import courseReducer from './courseReducer'
import menuReducer from './menuReducer'
import genreReducer from './genreReducer'
import searchReducer from './searchReducer'

export default combineReducers({
    courses: courseReducer,
    async: asyncReducer,
    menu: menuReducer,
    genres: genreReducer,
    totals: searchReducer
})