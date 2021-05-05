import tmdbAPI from '../apis/tmdbAPI'
import { API_KEY } from '../config';
import { wait } from '../components/utils'

import { 
    ASYNC_START, ASYNC_END, 
    FETCH_RESOURCES, FETCH_RESOURCE, FETCH_CREDITS, FETCH_GENRES, FETCH_RECOMMENDED, 
    FETCH_PERSON,
    SEARCH_TOTALS, 
    OPEN_DROPDOWN, MENUDRAW_OPENED 
} from './types'

// actions creators for our app
//
//
// for more info on the movie database api go here
// https://developers.themoviedb.org/3/getting-started/introduction
//
// Get the primary information about a resource based on ID. Resource can be TV or Movie
// GET /movie/{movie_id}
//
export const fetchResource = (media, id) => async dispatch => {

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false)) // incase we are in mobile mode
    
    await wait(700) // for development only
    const response = await tmdbAPI.get(`${media}/${id}?api_key=${API_KEY}&language=en-US&region=US`)

    dispatch({ type: FETCH_RESOURCE, payload: response.data})
    dispatch(fetchCredits(media, id))

    dispatch(asyncEnd())
}

// Called from the drop down menu.
//
// Get POPULAR, TOP RATED, UPCOMING or LATEST list for Movie or TV
//
// 
export const fetchResources = (media, resource, page=1) => async dispatch => {

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))

    await wait(700) // for development only
    const response = await tmdbAPI.get(`${media}/${resource}?api_key=${API_KEY}&language=en-US&region=US&page=${page}`)
    
    dispatch({ type: FETCH_RESOURCES, payload: {...response.data, media, endpoint:resource}})
    dispatch(asyncEnd())
}

//
// This action creator is called by when we need to filter and/or sort out data
// 

export const discoverResources = (media='movie', params) => async dispatch => {

    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only
    
    // remove any 'empty' keys where value = '' pairs. Axios doesn't like this.
    const queryParams = Object.entries({...params, with_genres:params.with_genres.join(',')}).reduce((arr, [key, value]) => value ? { ...arr, [key]: value } : arr, {})

    const response = await tmdbAPI.get(`discover/${media}?api_key=${API_KEY}&language=en-US`, {
        params: queryParams
    })

    // Remove this porperty from the response data
    delete(response.data.params)
    dispatch({ type: FETCH_RESOURCES, payload: {...response.data, endpoint:'discover', media}})

    dispatch(asyncEnd())
}

//
// Get the list of official genres for movies/tv. e.g 
//    ... {"id": 35,  "name": "Comedy"}, {"id": 37, "name": "Western"}, ...
// 
// GET /genre/movie/list
//
export const fetchGenres = () => async dispatch => {

    const response = await tmdbAPI.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
    const newGenresObj = response.data.genres.reduce((acc, {id, name}) => {
        acc[id] = name
        return acc
    },{})

    dispatch({ type: FETCH_GENRES, payload: {ids:newGenresObj, original:response.data.genres}})
}

//
//  GET /movie/{movie_id}/credits
//  Get the cast and crew for a movie/tv
//
//
export const fetchCredits = (media,id) => async dispatch => {

    const response = await tmdbAPI.get(`${media}/${id}/credits?api_key=${API_KEY}&language=en-US`)  

    // We are only interested in directors and screenplay writers for this project. Filter out the rest
    
    const directors = response.data.crew.filter( (member) => member.job === "Director");
    const screenplay = response.data.crew.filter( (member) => member.job === "Screenplay");

    dispatch({ type: FETCH_CREDITS, payload: {cast:response.data.cast, directors, screenplay} })
}


//  Fetch a list of recommendations based on id 

export const fetchRecommended = (media,id) => async dispatch => {
    const response = await tmdbAPI.get(`${media}/${id}/recommendations?api_key=${API_KEY}&language=en-US`)
    dispatch({ type: FETCH_RECOMMENDED, payload: response.data })
}


//
// Retrieve a list of movies or tv shows based on the media type andd query supplied.
// 

export const searchResource = (media, query, page=1) => async dispatch => {

    // This action creator is called when the user enters a query into the search bar
    dispatch(asyncStart())
    dispatch(menuDrawOpened(false))
    await wait(700) // for development only
    const response = await tmdbAPI.get(`search/${media}?query=${query}&api_key=${API_KEY}&language=en-US&&region=US&page=${page}`)
    dispatch({ type: FETCH_RESOURCES, payload: response.data})

    dispatch(asyncEnd())
}

//
// This action uses the search end point to gather totals for each of the following categories
// ['collection','person','tv','movie']. This is used in searchTMDB to filter out results
//

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

//
// This action creator builds a person object based on 3 fetches to the api
// 
export const fetchPerson = (id) => async dispatch => {
    // 
    // Get the primary person details by id.
    //
    const response = await tmdbAPI.get(`person/${id}?api_key=${API_KEY}&language=en-US`)
    //
    // GET the highest grossing movies list by this particular person using id
    //
    const hightestGrossgMovies = await tmdbAPI.get(`https://api.themoviedb.org/3/discover/movie?with_people=${id}&sort_by=revenue.desc&api_key=844dba0bfd8f3a4f3799f6130ef9e335`)
    //
    // GET /person/{person_id}/combined_credits
    // Get the movie and TV credits together in a single response.
    //  
    const credits = await tmdbAPI.get(`person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`)
    //
    // Filter out the 'bad' dates and sort into desc year
    //
    const actingCredits = credits.data.cast.map((movie) => {
        return {
            id:movie.id,
            media:movie.media_type,
            year: (movie.release_date || 'XXXX-00-00').substring(0, 4),
            title: movie.title,
            character: movie.character,
            vote:movie.vote_average
        } 
    })
    .filter(movie => movie.year !== 'XXXX')
    .sort((a,b) => (a.year< b.year) ? 1 : ((b.year < a.year) ? -1 : 0));

    dispatch({ type: FETCH_PERSON, payload: {...response.data, topTwenty:hightestGrossgMovies.data.results, actingCredits:actingCredits}})
}


////////////////////////////////////////
//
//
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

