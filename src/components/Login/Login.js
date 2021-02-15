import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../utils/LoadingCircle/Loading';
import validateLogin from '../../utils/validateInfo';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            submit();
        }
    }, [errors])

    const submit = () => {
        // code login axios request
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            username: username,
            password: password
        }
        setErrors(validateLogin(values));
        setSubmitting(true);
    }

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
                <button className="login-button" onClick={handleSubmit}>Login!</button>
            </div>
            <p className="not-acount-p">You don't have an account? <Link to="/register" className="redirect-log-a">Register now</Link>!</p>
        </div>
    )
}

export default Login