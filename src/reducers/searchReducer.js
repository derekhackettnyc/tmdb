import { SEARCH_TOTALS } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) { 
        case SEARCH_TOTALS:
            return action.payload               
        default:
            return state
    }
}