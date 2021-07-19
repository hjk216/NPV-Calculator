import React, { Suspense } from 'react'
import { useCookies } from 'react-cookie'
import { HashRouter as Route, Switch, Redirect } from 'react-router-dom'

import Home from '../features/home/Home'
import Register from '../features/register/Register'
import Login from '../features/login/Login'



export default function Path() {
    const [cookies] = useCookies(['token'])

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/register'>
                        {cookies.token ? <Redirect to ='/' /> : <Register />}
                    </Route>
                    <Route path='/login'>
                        {cookies.token ? <Redirect to ='/' /> : <Login />}
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Suspense>
        </div>
    )
}
