
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";
export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const BASE_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        fetch(`${BASE_URL}/profile`, {
            credentials: 'include'

        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);

            })
        })
    }, [])

    function logout() {
        fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        })
        setUserInfo(null);
    }

    const Username = userInfo?.Username

    return (
        <header>
            <Link to='/' className='logo'>My Logo</Link>
            <nav>
                {Username && (
                    <>
                        <span className="user "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                            {Username}</span>
                        <Link to="/create">create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!Username && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}