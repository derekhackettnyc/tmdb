import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroller'

import Resource from './Resource'
import Spinner from '../ui/Spinner'

// Redux - actions creators
import { searchResource, fetchGenres, fetchSearchCategoryTotals } from '../../actions'

const actions = {
    searchResource,
    fetchGenres,
    fetchSearchCategoryTotals
}

const SORT_TYPES = {
    popularity: 'popularity.desc',
    ratings: 'vote_average.desc',
    release: 'release_date.desc'
}

const SearchTMDB = (props) => {

    const { isLoading, resources, totals, searchResource, fetchGenres, fetchSearchCategoryTotals } = props
    const { query } = props.match.params;

    const [search,setSearch] = React.useState('movie')

    useEffect(() => {
        searchResource(search,query)
    },[search])

    useEffect(() => {
        fetchGenres()
        fetchSearchCategoryTotals(query)
    }, [])

    return (
        <>
            <h1 className="page-heading">{`Query ${search} | ${query} - ${totals.reduce((acc,{_,total})=> acc+total,0)} results`}</h1>
            <section className='search'>
                <aside className='search__aside'>
                    <div className="results">
                            <h4 className='results__heading'>Search Categories</h4>
                            <ul className="results__list">
                                {
                                    totals && totals.map(({name,total}) => (
                                       <li className='results__item' key={name}>
                                            <button className={`results__button ${name === search && 'bg--slate color--white'}`} onClick={() => setSearch(name)}>
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
                            resources.results && resources.results.map((resource, i) => <Resource resource={resource} key={`${i}-${resource.id}`} />)
                        }
                    </ul>
                </div>
            </section>

            {isLoading ? <Spinner /> : null}
            {(resources.page <= resources.total_pages && !isLoading)
                ?
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <button className='trueblue' onClick={() => searchResource(search, query, resources.page + 1)}>Load More</button>
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
        resources: state.courses,
        genres: state.genres,
        totals: state.totals
    }
}

// Still using connect - More GIT
export default connect(mapStateToProps, actions)(SearchTMDB)