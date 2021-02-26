import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CreatePost from '../CreatePost/CreatePost';
import Engagement from '../Engagement/Engagement';
import './Home.css';

const APIurl = "http://192.168.1.14:3001";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [outdated, setOutdated] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        Axios.get(`${APIurl}/post/`)
            .then(res => {
                console.log(res);
                setPosts(res.data);
                setOutdated(false);
            })
            .catch(err => {
                console.log(err);
                setOutdated(false);
            })
    }, [outdated])

    const outdate = () => {
        setOutdated(true);
    }

    return (
        <div className="home-container">
            <div className="posts">
            {posts.map((val, key) => {
                return (
                <div className="post-container" id={key}>
                    <div className="author-name">
                        <code className="author">{val.author}</code> says:
                    </div>
                    <div className="body">
                        {val.body}
                    </div>
                    <Engagement post={val} refresh={outdate} />
                </div>
            )})}
            </div>
            <div className="profile">
                {auth.user 
                    ? (
                        <>
                            <div className="data-container">
                                <h1>Welcome again to <code>SocialBig</code></h1>
                                <p>Check out everything what happened today!</p>
                            </div>
                            <CreatePost refresh={outdate} />
                        </>
                    )
                    : (
                        <div>
                            <h1>Want to interactuate with World like they do?</h1>

                            <h3>You can now <Link to="/register">sign up</Link>, it would be take just a few seconds!</h3>

                            <p>If you already signed up, then you can <Link to="/login">login</Link> here.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home