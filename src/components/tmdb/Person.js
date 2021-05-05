import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { fetchPerson } from '../../actions'
import { IMAGE_BASE_URL, PROFILE_SIZE } from '../../config'


const Person = props => {

    const { id } = props.match.params;

    const { isLoading, person } = useSelector(state => ({
        isLoading: state.async.loading,
        person: state.resources.person
    }))

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchPerson(id))
    }, [id])


    const { name, profile_path, biography, known_for_department, gender, birthday, place_of_birth, topTwenty, actingCredits } = person


    return (
        <Fragment>
            <section className="section about">
                <h1 className="page-heading t-ruled-after">{name}</h1>
                <section className="section award-winning-design">
                    <div className="flyer flyer--center">
                        <div className="flyer__write-up flyer__write-up--end">
                            <h2 className="flyer__title t-ruled-after">Biography</h2>
                            <p className="flyer__blurb">
                                {biography}
                            </p>
                        </div>
                        <figure className="flyer__figure  moveInRight">
                            <img src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${profile_path}`} alt={name} />
                        </figure>
                    </div>
                </section>

                <section className="section bg--off-white" style={{ padding: '2rem' }}>
                    <ul className="promotes" style={{ marginTop: '5rem' }}>
                        <li className="promote">
                            <i className="fas fa-3x fa-film color--yellow align--center"></i>
                            <h3 className="promote__title align--center">{known_for_department}</h3>
                        </li>
                        <li className="promote">
                            <i className={`fas fa-3x ${gender === 2 ? 'fa-male' : 'fa-female'} color--yellow align--center`}></i>
                            <h3 className="promote__title align--center">{gender === 2 ? 'male' : 'female'}</h3>
                        </li>
                        <li className="promote">
                            <i className="fas fa-3x fa-birthday-cake color--yellow align--center"></i>
                            <h3 className="promote__title align--center">{new Date(birthday).toDateString()}</h3>
                        </li>
                        <li className="promote">
                            <i className="fa-3x fas fa-map-marker-alt color--yellow align--center"></i>
                            <h3 className="promote__title align--center">{place_of_birth}</h3>
                        </li>
                    </ul>
                </section>

                <section className="section portfolio">
                    <h2 className="section__heading" style={{ marginTop: '10rem' }}>Highest Grossing Movies</h2>

                    <ul className="porfolios">
                        {
                            topTwenty && topTwenty.slice(0, 10).map((movie, i) => {
                                const { id, title, overview, poster_path } = movie
                                return (
                                    <li className="portfolio-card" key={id}>
                                        <div className="portfolio-card__write-up">
                                            <p className="portfolio-card__no">{`${i < 9 ? '0' : ''}${i + 1}`}</p>
                                            <h2 className="portfolio-card__title">{title}</h2>
                                            <p className="portfolio-card__paragraph">
                                                {overview}
                                            </p>
                                            <Link to={`/${'movie'}/${id}`}>
                                                <button className="portfolio-card__button outline-grey">View Details</button>
                                            </Link>
                                        </div>
                                        <div className="portfolio-card__figure">
                                            <img className="portfolio-card__img" src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${poster_path}`} alt={name} />
                                        </div>
                                    </li>
                                )
                            })

                        }
                    </ul>
                </section>

                <section className='' style={{ backgroundColor: '#f7f7f7', padding: '5rem 0' }}>
                    <h2 className="section__heading" style={{ padding: '3rem' }}>Acting Credits</h2>
                    <div className="timeline">
                        {
                            actingCredits && actingCredits.map(({ id, year, title, character }, i) => (
                                <div key={id} className={`timeline__container timeline--${i & 1 ? 'right' : 'left'}`}>
                                    <div className="timeline__content resume-card">
                                        <h2 className='resume-card__year'>{year}</h2>
                                        <div className='resume-card__details'>
                                            <Link to={`/${'movie'}/${id}`}>
                                                <h4>{title}</h4>
                                            </Link>
                                            <h5>{character}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>


            </section>
        </Fragment>
    )
}

export default Person