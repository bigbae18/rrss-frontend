import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Engagement from '../Engagement/Engagement';
import './Profile.css';

const APIurl = "http://192.168.1.14:3001";

const ProfileUploads = () => {

    const [uploads, setUploads] = useState([])
    const auth = useAuth();

    useEffect(() => {
        Axios.get(`${APIurl}/post/byUser/${auth.user.username}`).then(res => {
            setUploads(res.data);
        }).catch(err => {
            console.error(err);
        })
    })

    return (
        <>
        <h1>This are all your posts! Check them out.</h1>
        <div className="uploads-container">
            {uploads && uploads.map((val, key) => {
                return(
                    <div className="profile-posts-container">
                        <div className="profile-author">
                            <code>{val.author}</code> says:
                        </div>
                        <div className="profile-body">
                            {val.body}
                        </div>
                        <Engagement post={val} />
                    </div>
                )
            })}
        </div> 
        </>
    )
}

export default ProfileUploads;