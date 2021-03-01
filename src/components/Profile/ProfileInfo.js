import { useAuth } from '../../hooks/useAuth';
import './Profile.css';

const ProfileInfo = ({ logout }) => {
    const auth = useAuth();

    return (
        <div className="profile-info-container">
            <h1>Welcome, <code>{auth.user.username}</code></h1>
            <h3>From here you will be able to Log Out from your account.</h3>
            <button className="logout-button" onClick={logout}>Log Out</button>
            <p>In the future, you will be able to upload your profile picture even personal information!</p>
        </div>
    )
}

export default ProfileInfo;