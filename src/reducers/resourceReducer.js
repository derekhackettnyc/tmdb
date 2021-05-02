import { FETCH_RESOURCES } from '../actions/types'

export default (state = {results:[]}, action) => {

    switch (action.type) {
        case FETCH_RESOURCES: {
            const results = action.payload.page > 1 ? [...state.results, ...action.payload.results] : action.payload.results
            return {
                ...action.payload,
                results
            }
        }           
        default:
            return state
    }
}