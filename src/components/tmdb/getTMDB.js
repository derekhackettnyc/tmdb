import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Course from './Course'
import Spinner from '../ui/Spinner'
import FilterButtons from './FilterButtons'

import { IMAGE_BASE_URL, PROFILE_SIZE } from '../../config'


// Redux - actions creators
import { fetchCourses, filterCourses, discoverResources, fetchGenres } from '../../actions'

const actions = {
    fetchCourses,
    filterCourses,
    discoverResources,
    fetchGenres
}


const SORT_TYPES = {
    popularity: 'popularity.desc',
    ratings: 'vote_average.desc',
    release: 'release_date.desc'
}

const GetTMDB = (props) => {

    const { isLoading, courses, genres, fetchCourses, filterCourses, discoverResources, fetchGenres } = props
    const { catagory, subcatagory, topic, query } = props.match.params;

    const paramsRef = useRef({})

    // const [sort, setSort] = React.useState('popularity')

    const [sideNav, setSideNav] = useState(true)

    // const [genreArr, setGenreArr] = useState([])

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
        fetchGenres()
        fetchCourses(catagory, subcatagory)
    }, [])


    useEffect(() => {
        // Once MOUNTED / PROPS CHANGED Grab the data
        if(params.page > 1) {
            const resourceType = (params.with_genres.length === 0) && (params.sort_by === 'popularity')
            console.log("resourceTYpe",resourceType)
            resourceType ? fetchCourses(catagory, subcatagory, params.page) : discoverResources(catagory, params)
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
        discoverResources(catagory, params)
    }

    const handleLoadMore = () => {

        setParams({...params, page:params.page+1})
        // const resourceType = (params.with_genres.length === 0) && (params.sort_by === 'popularity')
        // console.log("resourceTYpe",resourceType)
        // resourceType ? fetchCourses(catagory, subcatagory, params.page) : discoverResources(catagory, params)
    }

    return (
        <>
            <h1 className="page-heading">{`${catagory} | ${sub} - ${courses.total_results} results`}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', width: '50%' }}>
                <button onClick={() => setSideNav(!sideNav)}>FILTER</button>
            </div>

            <div className='filter-resources'>
                <div className='filter-resources__components filter-resources__components' style={{ width: sideNav && '250px' }} >
                    <div className='box'>
                    <select className="select-css" onChange={event => setParams({...params, sort_by:event.target.value, page:1})}>
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
                            courses.results &&
                            courses.results
                                .slice(0,1)
                                .map((course, i) => <Course course={course} key={`${i}-${course.id}`} />) // display the courses
                        }
                    </ul>
                </div>
            </div>

            {isLoading ? <Spinner /> : null}
            {(courses.page <= courses.total_pages && !isLoading)
                ?
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    {/* <button onClick={() => setParams({...params, page:courses.page+1})}>Load More</button> */}
                    {/* <button onClick={() => applyFilters(courses.page+1)}>Load More</button> */}
                    <button onClick={handleLoadMore}>Load More</button>
                </div>
                :
                null
            }

        </>

    )

}

// Get values from redux store and map to props. Yes. Still using mapState - it's a GIT thing!
const mapStateToProps = state => {
    return {
        isLoading: state.async.loading,
        courses: state.courses,
        genres: state.genres
    }
}

// Still using connect - More GIT
export default connect(mapStateToProps, actions)(GetTMDB)