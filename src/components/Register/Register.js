import './Register.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RegisterSuccess from './RegisterSuccess';
import { useAuth } from '../../hooks/useAuth';

import validateRegisterInfo from '../../utils/validateInfo';
import Loading from '../../utils/LoadingCircle/Loading';


const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const auth = useAuth();

    useEffect(() => {
        setSubmitting(false);
        if (Object.keys(errors).length === 0 && submitting) {
            submit();
            setSubmitting(true);
        }
    }, [errors])

    const submit = async () => {
        await auth.signUp({ username, password, email }).then(() => {
            console.log('in here');
            setSubmitting(false);
            setSubmitted(true); 
            console.log(auth);
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
            password: password,
            repassword: repassword,
            email: email
        };
        setErrors(validateRegisterInfo(values))
        setSubmitting(true);
    }

    return (
        <>
            {submitted ? 
            <RegisterSuccess />
            :
            <div className="register-container">
                <h1>Register with us!</h1>
                <div className="register-form">
                    {submitting ? 
                        <Loading /> 
                        :
                        <>
                            {errors.database && <p className="error-db">{errors.database}</p>}
                            <input 
                                            type="text" 
                                            placeholder="Username..." 
                                            required
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value)
                                            }}
                                            />
                            {errors.username && <p className="error-p">{errors.username}</p>}
                            <input 
                                            type="password" 
                                            placeholder="Password..." 
                                            required
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}/>
                            {errors.password && <p className="error-p">{errors.password}</p>}
                            <input 
                                            type="password" 
                                            placeholder="Repeat your password..." 
                                            required
                                            value={repassword}
                                            onChange={(e) => {
                                                setRepassword(e.target.value)
                                            }}/>
                            {errors.repassword && <p className="error-p">{errors.repassword}</p>}
                            <input 
                                            type="email" 
                                            placeholder="E-Mail..." 
                                            required
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}/>
                            {errors.email && <p className="error-p">{errors.email}</p>}
                            <button className="register-button" onClick={handleSubmit}>Register!</button>
                        </>
                    }
                </div>
                <p className="signed-up-p">If you already have signed up, please <Link to="/login" className="redirect-reg-a">click here</Link>.</p>
            </div>
            }
        </>
    )
}

export default Register