import { FETCH_GENRES } from '../actions/types'

export default (state = {}, action) => {

    switch (action.type) {
        case FETCH_GENRES:
            return action.payload
        default:
            return state
    }
}
