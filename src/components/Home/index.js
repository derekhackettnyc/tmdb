import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <Fragment>
            <section className="home">
                <h1 className="main-heading">
                    <span className="main-heading--main moveInLeft color--yellow">React Movies/TV</span>
                    <span className="main-heading--sub moveInRight color--yellow">Movies, TV shows and people to discover</span>
                </h1>
            </section>
        </Fragment>
    )

}

export default Home