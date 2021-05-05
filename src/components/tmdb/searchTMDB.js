import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Resource from './Resource'
import Spinner from '../ui/Spinner'

// Redux - actions creators
import { searchResource, fetchGenres, fetchSearchCategoryTotals } from '../../actions'

const SearchTMDB = (props) => {

    const { query } = props.match.params;

    const { isLoading, resources, totals } = useSelector(state => ({
        isLoading: state.async.loading,
        resources: state.resources,
        genres: state.genres,
        totals: state.totals
    }))


    const dispatch = useDispatch()

    const [search,setSearch] = React.useState('movie')

    useEffect(() => {
        dispatch(fetchGenres())
        dispatch(fetchSearchCategoryTotals(query))
    }, [])

    useEffect(() => {
        dispatch(searchResource(search,query))
    },[search,query])


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
                            resources.results && resources.results.map((resource, i) => <Resource resourceType={search} resource={resource} key={`${i}-${resource.id}`} />)
                        }
                    </ul>
                </div>
            </section>

            {isLoading ? <Spinner /> : null}
            {(resources.page <= resources.total_pages && !isLoading)
                ?
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <button className='trueblue' onClick={() => dispatch(searchResource(search, query, resources.page + 1))}>Load More</button>
                </div>
                :
                null
            }
        </>
    )
}

export default SearchTMDB