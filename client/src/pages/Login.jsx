import { useState, useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login () {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [redirected, setRedirected] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const BASE_URL = import.meta.env.VITE_API_URL;

    const login = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ Username, Password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',

        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirected(true)
            });

        }
        else {
            alert('wrong credentials')
        }
    }
    if (redirected) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type='text' placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
            <a href=''>Forgot Password?</a>
        </form>

    )
}