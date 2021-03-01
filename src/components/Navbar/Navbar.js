import './Navbar.css';

import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {

    const auth = useAuth();

    return (
        <div className="navbar-container">
            <Link to="/" className="navbar-a">Home</Link>
            {auth.user ? (
                <p className="navbar-p">Welcome, <Link to={`/me`} className="navbar-user">{auth.user.username}</Link></p>
            ) : (
            <>
                <Link to="/register" className="navbar-a">Register</Link>
                <Link to="/login" className="navbar-a">Login</Link>
            </>
            )}
            
        </div>
    )
}

export default Navbar