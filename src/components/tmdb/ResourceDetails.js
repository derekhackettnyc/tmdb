import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchResource, fetchRecommended } from '../../actions'
import { IMAGE_BASE_URL, PROFILE_SIZE, BACKDROP_SIZE } from '../../config'
import SlickSlider from '../ui/SlickSlider'

const ResourceDetails = props => {

    const { resoureType, id } = props.match.params;

    const { isLoading, resource, credits, recommended } = useSelector(state => ({
        isLoading: state.async.loading,
        resource: state.resources.resource,
        credits: state.resources.credits,
        recommended: state.resources.recommended
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResource(resoureType, id))
        dispatch(fetchRecommended(resoureType, id))
    }, [resoureType, id])


    const { original_title, title, tagline, overview, backdrop_path, poster_path } = resource

    return (
        <>
            <section className='resource' style={{ background: `linear-gradient(to bottom right, rgba(10.98%, 11.76%, 12.55%, 1.00), rgba(10.98%, 11.76%, 12.55%, 0.64)), url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}) right center/cover no-repeat` }}>
                <div className='resource__right'>
                    <img className='resource__poster' src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${poster_path}`} alt={title} />
                </div>
                <div className='resource__left'>
                    <h1 className='resource__title'>{original_title}</h1>
                    <h4>{tagline}</h4>
                    <p className='resource__overview'>{overview}</p>
                </div>
            </section>


            <section className="section credits">
                <h2 className="blog-heading">Top Billed Cast</h2>
                {
                    credits.cast && credits.cast.slice(0, 11).map(({ id, name, profile_path, character }) => (
                        <Link to={`/person/${id}`}  key={id}>
                            <div className="catagory-card">
                                <div className="catagory-card__header">
                                    <div>
                                        <img src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${profile_path}`} alt={name} />
                                    </div>
                                </div>
                                <div className="catagory-card__content">
                                    <h3 className="catagory-card__title">{name}</h3>
                                    <p>
                                        <span>{character}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </section>

            <section>
                <div style={{ padding: '6rem' }}>
                    <h2 className="section__heading ">Recommendations</h2>
                    {
                        recommended && recommended.results && <SlickSlider slides={recommended.results.slice(0, 8)} />

                    }
                </div>
            </section>
        </>




    )
}

export default ResourceDetails