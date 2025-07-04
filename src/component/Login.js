import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [Credentials, setCredentials] = useState({email: "", password: ""})
    let history = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password }),
        });

        const json = await response.json();
        console.log(json)
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("LoggedIn Successfully", "success")
            history("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1 className='my-2 mb-4'>Login</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  onChange={onChange} value={Credentials.email} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={Credentials.password}  name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
