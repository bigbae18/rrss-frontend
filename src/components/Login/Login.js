import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../utils/LoadingCircle/Loading';
import { validateLoginInfo } from '../../utils/validateInfo';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({})

    const auth = useAuth();

    useEffect(() => {
        setSubmitting(false);
        console.log('in useeffect');
        if (Object.keys(errors).length === 0 && submitting) {
            console.log('no errors');
            submit();
            setSubmitting(true);
        }
    }, [errors])

    const submit = async () => {
        console.log('in submit');
        await auth.signIn({ username, password }).then(() => {
            setSubmitting(false);
            setSubmitted(true);
        }).catch(err => {
            setErrors({
                ...errors,
                database: err
            })
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            username: username,
            password: password
        }
        console.log('handleSubmit');
        setErrors(validateLoginInfo(values));
        setSubmitting(true);
    }

    return (
        <>
            {submitted ?
                <Redirect to="/" />
            :
                <div className="login-container">
                    <h1>Login with your account</h1>
                    <div className="login-form">
                        {submitting 
                        ? (<Loading />)
                        : 
                        <>
                            {errors.database && <p className="error-db">{errors.database}</p>}
                            <input
                                placeholder="Username..."
                                required
                                type="text"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }} 
                                />
                            {errors.username && <p className="error-p">{errors.username}</p>}
                            <input
                                placeholder="Password..."
                                required
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} 
                                />
                            {errors.password && <p className="error-p">{errors.password}</p>}
                            <button className="login-button" onClick={handleSubmit}>Login!</button>
                        </>
                        }
                    </div>
                    <p className="not-acount-p">You don't have an account? <Link to="/register" className="redirect-log-a">Register now</Link>!</p>
                </div>
            }
        </>
    )
}

export default Login