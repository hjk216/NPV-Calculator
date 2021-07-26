import React, { useState } from 'react'
import { Input, Button } from 'reactstrap'
import { useCookies } from 'react-cookie'
import { useLoginMutation } from '../auth/authSlice'
import { useDispatch } from 'react-redux'

import '../common/style.css'
import { setStateCookie } from '../auth/authStateSlice'



export default function Login() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const [cookies, setCookie] = useCookies(['token'])
    const [login, { data, isLoading, error }] = useLoginMutation()

    const onLogin = () => {
        login({username: username, password: password})
        .unwrap()
        .then((payload) => {
            setCookie('token', payload.token, {secure: true, sameSite: true})
            window.location.reload();
        })
    }

    return (
        <div id='register_div'>
            <h1>Login</h1>
            <Input className='auth_input' type='email' placeholder='email'  value={username} onChange={onUsernameChanged} />
            <div>{error ? error.data.username : ''}</div>
            <Input className='auth_input' type='password' placeholder='password' value={password} onChange={onPasswordChanged} />
            <div>{error ? error.data.password : ''}</div>
            <Button className='auth_button' onClick={onLogin}>Login</Button>
            <div>{error ? error.data.non_field_errors : ''}</div>
        </div>
    )
}
