import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Resource from './Resource'
import Spinner from '../ui/Spinner'

// Redux - actions creators
import { fetchResources, discoverResources, fetchGenres } from '../../actions'


const SORT_TYPES = {
    popularity: 'popularity.desc',
    ratings: 'vote_average.desc',
    release: 'release_date.desc'
}

const GetTMDB = (props) => {

    // const { isLoading, resources, genres, fetchResources, discoverResources, fetchGenres } = props
    const { catagory, subcatagory, topic, query } = props.match.params;


    const { isLoading, resources, genres } = useSelector(state => ({
        isLoading: state.async.loading,
        resources: state.resources,
        genres: state.genres
    }))

    const dispatch = useDispatch()

    const [sideNav, setSideNav] = useState(true)

    const [params, setParams] = useState({with_genres:[],sort_by:'popularity',page:1})

    const [sub, setSub] = useState(subcatagory)

    const [cat, setCat] = useState(catagory)

    const [page, setPage] = useState(1)

    const [discover, setDiscover] = useState(false)

    // Not using pagination, using InfiniteScroll to display new content when user scoll. 

    // const [ptr, setPtr] = useState(0)
    // const [perPage] = useState(5)
    // const [count, setCount] = useState({})


    useEffect(() => {
        dispatch(fetchGenres())
        dispatch(fetchResources(catagory, subcatagory))
    }, [])


    useEffect(() => {
        // Once MOUNTED / PROPS CHANGED Grab the data
        if(params.page) {
            const resourceType = (params.with_genres.length === 0) && (params.sort_by === 'popularity')
            resourceType ? dispatch(fetchResources(catagory, subcatagory, params.page)) : dispatch(discoverResources(catagory, params))
        }

    }, [catagory, subcatagory, params])


    const toggleButton = (ID) => {

        const genreArr = params.with_genres

        const idx = genreArr.findIndex(genre => genre === ID)
        if(idx === -1) {
            setParams({
                ...params, 
                with_genres:[...genreArr, ID],
                page:1
            })
        } else {
            const removed = [...genreArr]
            removed.splice(idx,1)
            setParams({
                ...params, 
                with_genres:removed,
                page:1
            })
        }
    }

    const handleSearch = () => {
        // setDiscover(true)
        setSub('Custom Filter')
        dispatch(discoverResources(cat, params))
    }

    const handleLoadMore = () => {
        setParams({...params, page:params.page+1})
    }

    return (
        <>
            <h1 className="page-heading">{`${catagory} | ${sub} - ${resources.total_results} results`}</h1>
            <div style={{marginLeft:'1rem'}}>
                <button className='trueblue' onClick={() => setSideNav(!sideNav)}><i className="fas fa-3x fa-sliders-h"></i></button>
            </div>

            <div className='filter-resources'>
                <div className='filter-resources__components filter-resources__components' style={{ width: sideNav && '250px' }} >
                    <div className='box'>
                    <select className="select-css" onChange={event => setParams({...params, sort_by:SORT_TYPES[event.target.value], page:1})}>
                        <option disabled>Sort</option>
                        <option value="popularity">Popularity (desc)</option>
                        <option value="ratings">Ratings (desc)</option>
                        <option value="release">Release Date (desc)</option>
                    </select>
                    </div>
                    <div className="genre">
                        <h4 className='genre__heading'>Category</h4>

                        <ul className="genre__list">
                            {
                                ['movie','tv'].map(category => (
                                    <li key={category}>
                                        <button 
                                            className={`genre__button ${category === cat && 'bg--navy'}`} 
                                            onClick={() => setCat(category)}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="genre">
                        <h4 className='genre__heading'>Genres</h4>

                        <ul className="genre__list">
                            {
                                genres.original && genres.original.map(genre => (
                                    <li key={genre.id}>
                                        <button 
                                            className={`genre__button ${params.with_genres.includes(genre.id) && 'bg--navy'}`} 
                                            onClick={() => toggleButton(genre.id)}
                                        >
                                            {genre.name}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                    <button onClick={handleSearch} className='filter-resources__button'>Search</button>
                </div>

                <div className='filter-resources__list-container'>
                    <ul className="courses">
                        {
                            resources.results &&
                            resources.results
                                // .slice(0,1)
                                .map((resource, i) => <Resource resource={resource} key={`${i}-${resource.id}`} />) // display the resources
                        }
                    </ul>
                </div>
            </div>


            {/* <div className='filter-resources'>
                <div className='filter-resources__components filter-resources__components' style={{ width: sideNav && '250px' }} >
                    <div className='box'>
                    <select className="select-css" onChange={event => setParams({...params, sort_by:SORT_TYPES[event.target.value], page:1})}>
                        <option disabled>Sort</option>
                        <option value="popularity">Popularity (desc)</option>
                        <option value="ratings">Ratings (desc)</option>
                        <option value="release">Release Date (desc)</option>
                    </select>
                    </div>
                    <div className="genre">
                        <h4 className='genre__heading'>Category</h4>

                        <ul className="genre__list">
                            {
                                ['movie','tv'].map(category => (
                                    <li key={category}>
                                        <button 
                                            className={`genre__button ${category === cat && 'bg--navy'}`} 
                                            onClick={() => setCat(category)}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="genre">
                        <h4 className='genre__heading'>Genres</h4>

                        <ul className="genre__list">
                            {
                                genres.original && genres.original.map(genre => (
                                    <li key={genre.id}>
                                        <button 
                                            className={`genre__button ${params.with_genres.includes(genre.id) && 'bg--navy'}`} 
                                            onClick={() => toggleButton(genre.id)}
                                        >
                                            {genre.name}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                    <button onClick={handleSearch} className='filter-resources__button'>Search</button>
                </div>

                <div className='filter-resources__list-container'>
                    <ul className="courses">
                        {
                            resources.results &&
                            resources.results
                                // .slice(0,1)
                                .map((resource, i) => <Resource resource={resource} key={`${i}-${resource.id}`} />) // display the resources
                        }
                    </ul>
                </div>
            </div> */}

            {isLoading ? <Spinner /> : null}
            {(resources.page <= resources.total_pages && !isLoading)
                ?
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <button className='trueblue' onClick={handleLoadMore}>Load More</button>
                </div>
                :
                null
            }

        </>

    )

}

export default GetTMDB
