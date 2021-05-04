import React, { Fragment, useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { menuDrawOpened } from '../actions'

import Layout from './HOC/Layout'
import HomePage from './Home'

import { debounce } from './utils'

import GetTMDB from './tmdb/getTMDB'
import SearchTMDB from './tmdb/searchTMDB'
import ResourceDetails from './tmdb/ResourceDetails'
import Person from './tmdb/Person'

import '../resources/scss/wild-style.scss'



const App = ({menuDrawOpened }) => {

    const myEfficientFn = debounce(() => menuDrawOpened(false), 500)

    useEffect(() => {
        window.addEventListener('resize', myEfficientFn);
        return function cleanup() {
            window.removeEventListener('resize', myEfficientFn)
        }
    }, [myEfficientFn]);

    return (
        <Fragment>
            <Layout>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/person/:id" component={Person} exact />

                    <Route path={['/search/:query']} exact component={SearchTMDB} />
                    <Route path={['/discover/:catagory/:subcatagory', '/discover/:catagory/:subcatagory/:topic']} exact component={GetTMDB} />
                    <Route path="/:resoureType/:id" component={ResourceDetails} exact />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        </Fragment>
    )
}


export default withRouter(connect(null,{ menuDrawOpened })(App));


