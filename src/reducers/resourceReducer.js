import { FETCH_RESOURCES, FETCH_RESOURCE, FETCH_CREDITS, FETCH_RECOMMENDED, FETCH_PERSON } from '../actions/types'

export default (state = {results:[], resource:{}, credits:[], person:{}}, action) => {

    switch (action.type) {
        case FETCH_RESOURCES: {
            const results = action.payload.page > 1 ? [...state.results, ...action.payload.results] : action.payload.results
            return {
                ...state,
                ...action.payload,
                results,
            }
        } 
        case FETCH_RESOURCE: {
            return {
                ...state,
                resource:action.payload
            }
        }  
        case FETCH_CREDITS: {
            return {
                ...state,
                credits:action.payload
            }
        } 
        case FETCH_RECOMMENDED: {
            return {
                ...state,
                recommended:action.payload
            }
        }
        case FETCH_PERSON: {
            return {
                ...state,
                person:action.payload
            }
        }          
        default:
            return state
    }
}