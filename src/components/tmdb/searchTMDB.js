import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import Course from './Course'
import Spinner from '../ui/Spinner'
import FilterButtons from './FilterButtons'

import { IMAGE_BASE_URL, PROFILE_SIZE } from '../../config'


// Redux - actions creators
import { searchResource, fetchCourses, filterCourses, discoverResources, fetchGenres, fetchSearchCategoryTotals } from '../../actions'

const actions = {
    searchResource,
    fetchCourses,
    filterCourses,
    discoverResources,
    fetchGenres,
    fetchSearchCategoryTotals
}

const SORT_TYPES = {
    popularity: 'popularity.desc',
    ratings: 'vote_average.desc',
    release: 'release_date.desc'
}

const SearchTMDB = (props) => {

    const { isLoading, courses, genres, totals, searchResource, fetchCourses, filterCourses, discoverResources, fetchGenres, fetchSearchCategoryTotals } = props
    const { catagory, subcatagory, topic, query } = props.match.params;

    // const [sort, setSort] = React.useState('popularity')

    const [sideNav, setSideNav] = React.useState(true)

    const [genreArr, setGenreArr] = React.useState([])

    // Not using pagination, using InfiniteScroll to display new content when user scoll. 
    const [ptr, setPtr] = useState(0)
    const [perPage] = useState(5)
    const [count, setCount] = useState({})
    const [filter, setFilter] = useState([])

    const [search,setSearch] = React.useState('movie')

    React.useEffect(() => {
        searchResource(search,query)
    },[search])

    useEffect(() => {
        fetchGenres()
        fetchSearchCategoryTotals(query)
        // discoverResources('movie','popularity.desc',genreArr.join(','),1)
    }, [])

    useEffect(() => {
        console.log("you want to search for ",genreArr)
    },[genreArr])

    useEffect(() => {
        // Once MOUNTED / PROPS CHANGED Grab the data
        console.log("QUERY",query)
        // filterCourses(query) 
    }, [query])

    const loadMoreResources = () => {
        query ? filterCourses(query, courses.page + 1) : fetchCourses(catagory, subcatagory, courses.page + 1)
    }

    return (
        <>
            <h1 className="page-heading">{`Search Query | ${query} - ${totals.reduce((acc,{_,total})=> acc+total,0)} results`}</h1>
            <section className='search'>
                <aside className='search__aside'>
                    <div className="results">
                            <h4 className='results__heading'>Search Categories</h4>
                            <ul className="results__list">
                                {
                                    totals && totals.map(({name,total}) => (
                                       <li className='results__item' key={name}>
                                            <button className="results__button" onClick={() => setSearch(name)}>
                                                <span>{name}</span>
                                                <span>({total})</span>
                                            </button>
                                       </li>
                                    ))
                                }
                            </ul>
                    </div>
                </aside>
                <div className='search__main'>
                    <ul className="courses">
                        {
                            courses.results &&
                            courses.results
                                .map((course, i) => <Course course={course} key={`${i}-${course.id}`} />) // display the courses
                        }
                    </ul>
                </div>
            </section>

            {isLoading ? <Spinner /> : null}
            {(courses.page <= courses.total_pages && !isLoading)
                ?
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <button onClick={() => searchResource(search, query, courses.page + 1)}>Load More</button>
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
        genres: state.genres,
        totals: state.totals
    }
}

// Still using connect - More GIT
export default connect(mapStateToProps, actions)(SearchTMDB)