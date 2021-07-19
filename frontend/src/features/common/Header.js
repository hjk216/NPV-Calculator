import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { setStateCookie } from '../auth/authStateSlice'
import { useLoginMutation, useLogoutMutation } from '../auth/authSlice'



export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [logout, { data, isLoading, error }] = useLogoutMutation()

    function logoutUser() {
        logout({'token': cookies.token})
        .unwrap()
        .then((payload) => {
            removeCookie('token')
            window.location.reload()
        })
    }

    const dispatch = useDispatch()
    dispatch(setStateCookie())



    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/#/">NPV Calculator</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {!cookies.token ? <Nav.Link href="/#/register">Register</Nav.Link> : ''}
                    {!cookies.token ? <Nav.Link href="/#/login">Login</Nav.Link> : ''}
                    {cookies.token ? <Nav.Link onClick={logoutUser}>Logout</Nav.Link> : ''}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
