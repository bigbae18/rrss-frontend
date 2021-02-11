import { useEffect, useState } from 'react';
import './Register.css';
import { Link, Redirect } from 'react-router-dom';
import validateRegisterInfo from '../../utils/validateInfo';
import Axios from 'axios';

const APIurl = 'http://localhost:3001';



const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            Axios.post(`${APIurl}/user/register`, {
                username: username,
                password: password,
                email: email
            }).then(res => {
                console.log(res)

                const { code } = res.data;

                switch(code) {
                    case 500:
                        console.log('here 500')
                        setErrors({
                            ...errors,
                            database: 'There was an error with register. Try again in few seconds.'
                        });
                        break;
                    case 401:
                        console.log('here 401')
                        setErrors({
                            ...errors,
                            database: 'Username/Email already exists!'
                        })
                        break;
                    default:
                        console.log('in here!! 200');
                        return <Redirect to="/reg-success" />
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, [errors])

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
        <div className="register-container">
            <h1>Register with us!</h1>
            {errors.database && <p className="error-p">{errors.database}</p>}
            <div className="register-form">
                <input 
                                type="text" 
                                placeholder="Username..." 
                                required
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                />
                {errors.username && <p className="error-p">{errors.username}</p>}
                <input 
                                type="password" 
                                placeholder="Password..." 
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}/>
                {errors.password && <p className="error-p">{errors.password}</p>}
                <input 
                                type="password" 
                                placeholder="Repeat your password..." 
                                required
                                onChange={(e) => {
                                    setRepassword(e.target.value)
                                }}/>
                {errors.repassword && <p className="error-p">{errors.repassword}</p>}
                <input 
                                type="email" 
                                placeholder="E-Mail..." 
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                {errors.email && <p className="error-p">{errors.email}</p>}
                <button className="register-button" onClick={handleSubmit}>Register!</button>
            </div>
            <p className="signed-up-p">If you already have signed up, please <Link to="/login" className="redirect-reg-a">click here</Link>.</p>
        </div>
    )
}

export default Register