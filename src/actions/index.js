import tmdbAPI from '../apis/tmdbAPI'
import { API_KEY } from '../config';
import { wait } from '../components/utils'

import { 
    ASYNC_START, ASYNC_END, 
    FETCH_RESOURCES, FETCH_RESOURCE, FETCH_CREDITS, FETCH_GENRES, FETCH_RECOMMENDED, 
    FETCH_PERSON,
    SEARCH_TOTALS, OPEN_DROPDOWN, MENUDRAW_OPENED 
} from './types'

// actions creators


export const fetchResource = (category, id) => async dispatch => {

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false)) // incase we are in mobile mode
    
    await wait(700) // for development only
    const response = await tmdbAPI.get(`${category}/${id}?api_key=${API_KEY}&language=en-US&region=US`)

    dispatch({ type: FETCH_RESOURCE, payload: response.data})
    dispatch(fetchCredits(category, id))

    dispatch(asyncEnd())
}


export const fetchResources = (category, subcategory, page=1) => async dispatch => {

    // This action creator is called when a menu item is selected. 
    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))

    await wait(700) // for development only
    const response = await tmdbAPI.get(`${category}/${subcategory}?api_key=${API_KEY}&language=en-US&region=US&page=${page}`)
    
    dispatch({ type: FETCH_RESOURCES, payload: response.data})

    // const directors = result.crew.filter( (member) => member.job === "Director");

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


export const fetchCredits = (resource,id) => async dispatch => {

    const response = await tmdbAPI.get(`${resource}/${id}/credits?api_key=${API_KEY}&language=en-US`)  
    const directors = response.data.crew.filter( (member) => member.job === "Director");
    const screenplay = response.data.crew.filter( (member) => member.job === "Screenplay");

    dispatch({ type: FETCH_CREDITS, payload: {cast:response.data.cast, directors, screenplay} })
}




export const fetchRecommended = (resource,id) => async dispatch => {
    const response = await tmdbAPI.get(`${resource}/${id}/recommendations?api_key=${API_KEY}&language=en-US`)
    dispatch({ type: FETCH_RECOMMENDED, payload: response.data })
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


export const fetchPerson = (id) => async dispatch => {
    const response = await tmdbAPI.get(`person/${id}?api_key=${API_KEY}&language=en-US`)
    const hightestGrossgMovies = await tmdbAPI.get(`https://api.themoviedb.org/3/discover/movie?with_people=${id}&sort_by=revenue.desc&api_key=844dba0bfd8f3a4f3799f6130ef9e335`)

    const credits = await tmdbAPI.get(`person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`)
    const actingCredits = credits.data.cast.map((movie) => {
        return {
            id:movie.id,
            media:movie.media_type,
            year: (movie.release_date || 'XXXX-00-00').substring(0, 4),
            title: movie.title,
            character: movie.character,
            vote:movie.vote_average
        } 
    }).filter(movie => movie.year !== 'XXXX')
    .sort((a,b) => (a.year< b.year) ? 1 : ((b.year < a.year) ? -1 : 0));

    // console.log("ACTING",actingCredits)
    // await tmdbAPI.get(`person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`)

    dispatch({ type: FETCH_PERSON, payload: {...response.data, topTwenty:hightestGrossgMovies.data.results, actingCredits:actingCredits}})
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

