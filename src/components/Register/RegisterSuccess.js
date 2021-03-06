import { Link } from 'react-router-dom';
import './Register.css';

const RegisterSuccess = () => {
    return (
        <div className="register-container">
            <h1>Registered succesfully!</h1>
            <p>Now you can Login making <Link to="/login" className="redirect-reg-a">click here</Link>.</p>
            <p>Then you could follow your friends, post what you're thinking about or else update your profile!</p>
        </div>
    )
}

export default RegisterSuccess