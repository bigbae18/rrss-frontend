import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ProfileInfo from './ProfileInfo';
import './Profile.css';
import ProfileUploads from './ProfileUploads';

const APIurl = 'http://localhost:3001';

const Profile = () => {

    // const [errors, setErrors] = useState({});
    const auth = useAuth();

    const handleLogout = e => {
        e.preventDefault();

        auth.signOut();
    }

    return (
        <>
        { !auth.user 
            ? <Redirect to="/" />
            : (
                <div className="profile-container">
                    <ProfileInfo logout={handleLogout} />
                    <ProfileUploads />     
                </div>
            )
        }
        </>
    )
}

export default Profile;