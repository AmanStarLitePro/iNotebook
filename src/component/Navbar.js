import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    let location = useLocation()
    let history = useNavigate();
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }

    // useEffect(() => {
    //     // Google Analytics
    //     // console.log(location.pathname)
    // }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">iNotebook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"}?'active':''`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"}?'active':''`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
