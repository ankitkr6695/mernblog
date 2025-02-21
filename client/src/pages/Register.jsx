import { useState } from "react"
import { useActionData } from "react-router-dom"

export default function register() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const BASE_URL = import.meta.env.VITE_API_URL;
    async function register(e) {
        e.preventDefault();
        const resp=await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ Username, Password }),
            headers: { 'content-type': 'application/json' }
        });
        if(resp.status===200){
            alert('Registration successful');
        }
        else{
            alert('Registration failed');
        }
        
    }
    return <>
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type='text' placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Register</button>
            <p>Already have an account? <a href='/login'>Login</a></p>
        </form>
    </>
}