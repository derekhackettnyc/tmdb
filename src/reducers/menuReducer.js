import { OPEN_DROPDOWN,MENUDRAW_OPENED } from '../actions/types'

const INITIAL_STATE = {
    dropDown:'',
    isDrawOpened:false
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case OPEN_DROPDOWN:
            return {
                ...state,
                dropDown: action.payload
            }   
        case MENUDRAW_OPENED:
            return {
                ...state,
                isDrawOpened: action.payload
            }            
        default:
            return state
    }

}