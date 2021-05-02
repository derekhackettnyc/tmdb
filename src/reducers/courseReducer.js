import { FETCH_RESOURCES, FILTER_COURSES } from '../actions/types'

export default (state = {results:[]}, action) => {

    

    switch (action.type) {
        case FETCH_RESOURCES: {
            const results = action.payload.page > 1 ? [...state.results, ...action.payload.results] : action.payload.results
            return {
                ...action.payload,
                results
            }
        }
              
        case FILTER_COURSES:
            return action.payload               
        default:
            return state
    }
}