import React, { useState }  from 'react'
import { Input, Button } from 'reactstrap'
import { useRegisterMutation } from '../auth/authSlice'
import { useCookies } from 'react-cookie'

import '../common/style.css'
import { setStateCookie } from '../auth/authStateSlice'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const [cookies, setCookie] = useCookies(['token'])
    const [register, { data, isLoading: isUpdating, error }] = useRegisterMutation()
    
    const onRegister = () => {
        register({username: username, password: password})
        .unwrap()
        .then((payload) => {
            setCookie('token', payload.token, {secure: true, sameSite: true})
            window.location.reload();
        })
    }

    return (
        <div id='register_div'>
            <h1>Register</h1>
            <Input className='auth_input' type='email' placeholder='email' value={username} onChange={onUsernameChanged} />
            <div>{error ? error.data.username : ''}</div>
            <Input className='auth_input' type='password' placeholder='password' value={password} onChange={onPasswordChanged} />
            <div>{error ? error.data.password : ''}</div>
            <Button className='auth_button' onClick={onRegister}>Register</Button>
        </div>
    )
}
