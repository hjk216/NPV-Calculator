import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Cookies, useCookies } from 'react-cookie'

import { store } from './store'
import Header from '../features/common/Header'
import Path from './Path'



class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <Path />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

//<Provider >
//store={store}
