import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Profile.css';

const APIurl = 'http://localhost:3001';

const Profile = () => {

    const [errors, setErrors] = useState({});
    const { user, signOut } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        Axios.get(`${APIurl}/user/id/${id}`)
    })

    const handleLogout = e => {
        e.preventDefault();

        signOut();
    }

    return (
        <>
        { user 
            ? <Redirect to="/" />
            : (
                <div className="profile-container">
                    <h1>Welcome, <code>{user.username}</code></h1>
                    <h3>From here you will be able to Log Out from your account.</h3>

                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                    <p>In the future, you will be able to upload your profile picture even personal information!</p>
                </div>
            )
        }
        </>
    )
}

export default Profile;