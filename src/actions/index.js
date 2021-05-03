import tmdbAPI from '../apis/tmdbAPI'
import { API_KEY } from '../config';
import { wait } from '../components/utils'

import { ASYNC_START, ASYNC_END, FETCH_RESOURCES, FETCH_GENRES, SEARCH_TOTALS, OPEN_DROPDOWN, MENUDRAW_OPENED } from './types'

// actions creators

export const fetchResources = (category, subcategory, page=1) => async dispatch => {

    // This action creator is called when a menu item is selected. 
    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only
    const response = await tmdbAPI.get(`${category}/${subcategory}?api_key=${API_KEY}&language=en-US&region=US&page=${page}`)
    dispatch({ type: FETCH_RESOURCES, payload: response.data})

    dispatch(asyncEnd())
    console.log("RESPONSE",response.data)
}


export const discoverResources = (resource='movie', params, page=1) => async dispatch => {

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only
    
    // remove any 'empty' keys where value = '' pairs. Axios doesn't like this.
    const queryParams = Object.entries({...params, with_genres:params.with_genres.join(',')}).reduce((arr, [key, value]) => value ? { ...arr, [key]: value } : arr, {})

    // const response = await tmdbAPI.get(`discover/${resource}?api_key=${API_KEY}&language=en-US&with_genres=${genre}&sort_by=${sortType}&page=${page}`)
    const response = await tmdbAPI.get(`discover/${resource}?api_key=${API_KEY}&language=en-US`, {
        params: queryParams
    })

    // Remove this porperty from the response data
    delete(response.data.params)
    dispatch({ type: FETCH_RESOURCES, payload: response.data})

    console.log("SORT",response.data)

    dispatch(asyncEnd())
}


export const fetchGenres = () => async dispatch => {
    const response = await tmdbAPI.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)

    const newGenresObj = response.data.genres.reduce((acc, {id, name}) => {
        acc[id] = name
        return acc
    },{})

    dispatch({ type: FETCH_GENRES, payload: {ids:newGenresObj, original:response.data.genres}})
}



export const searchResource = (resource, query, page=1) => async dispatch => {

    // This action creator is called when the user enters a query into the search bar
    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only
    const response = await tmdbAPI.get(`search/${resource}?query=${query}&api_key=${API_KEY}&language=en-US&&region=US&page=${page}`)
    dispatch({ type: FETCH_RESOURCES, payload: response.data})

    console.log("SEARCH",response.data)

    dispatch(asyncEnd())
}


export const fetchSearchCategoryTotals = (query, page=1) => async dispatch => {

    const searches = ['collection','person','tv','movie']

    let response = {}
    let searchTotals = []

    for(const next of searches ) {
        response = await tmdbAPI.get(`search/${next}?query=${query}&api_key=${API_KEY}&language=en-US&page=${page}`)
        searchTotals.push({name:next, total: response.data.total_results})
    }

    dispatch({ type: SEARCH_TOTALS, payload: searchTotals.reverse()})

}



//////////////////

export const openDropDown = category => ({
        type:OPEN_DROPDOWN,
        payload: category
})


export const menuDrawOpened = flag => ({
    type: MENUDRAW_OPENED,
    payload:flag
})


// Action creators for async operations
export const asyncStart = () => ({type:ASYNC_START})
export const asyncEnd = () => ({type:ASYNC_END })

