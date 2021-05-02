import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'
import ScrollToTop from './components/ui/ScrollToTop'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)

ReactDom.render(
    <Provider store={store}>
    <BrowserRouter>
        <ScrollToTop>
                <App />
        </ScrollToTop>
    </BrowserRouter>,
    </Provider>,
    document.querySelector('#root')
)