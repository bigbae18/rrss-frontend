import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

const LoginSuccess = () => {
    const auth = useAuth();
    return (
        <div className="login-container">
            <h1>Login succesfully!</h1>
            <p>I hope you enjoy the community, {auth.user}, we glad to have you in <code>(insert name here)</code></p>
            <p>Now, you can set up your <Link to="#" className="account-a">profile</Link> if you didn't yet!</p>
            <Link to="/" className="home-a">Go Home</Link>
        </div>
    )
}

export default LoginSuccess