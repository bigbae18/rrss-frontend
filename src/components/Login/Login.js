import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login-container">
            <h1>Login with your account</h1>
            <div className="login-form">
                <input
                    placeholder="Username..."
                    required
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }} 
                    />
                <input
                    placeholder="Password..."
                    required
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} 
                    />
                <button className="login-button">Login!</button>
            </div>
            <p className="not-acount-p">You don't have an account? <Link to="/register" className="redirect-log-a">Register now</Link>!</p>
        </div>
    )
}

export default Login