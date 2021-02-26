import './Engagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fasThumbsUp, faThumbsDown as fasThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const APIurl = "http://192.168.1.14:3001/engagement";

const Engagement = (props) => {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const { post, refresh } = props;
    
    const { user } = useAuth()

    useEffect(() => {

        async function fetchData() {
            await Axios.get(`${APIurl}/likes/${post.id}`)
                .then(res => {
                    const { data } = res;

                    if (!user) {
                        return
                    }

                    const filter = data.filter(item => item.user_id === user.id);

                    console.log(filter);

                    setLiked(filter.length > 0 ? true : false);

                    console.log(liked);

                }).catch(err => {

                    console.error(err);

                })
            await Axios.get(`${APIurl}/dislikes/${post.id}`)
                .then(res => {
                    const { data } = res;
                    if (!user) {
                        return
                    }
                    const filter = data.filter(item => item.user_id === user.id);
                    setDisliked(filter.length > 0 ? true : false)
                    console.log(disliked);
                }).catch(err => {
                    console.error(err);
                })
        }

        fetchData();
    })

    const handleLike = e => {
        e.preventDefault();

        if (!user) {
            return
        }
        if (disliked) {
            handleUndoDislike(e);
        }

        Axios.post(`${APIurl}/like/add`, {
            postId: post.id,
            userId: user.id
        }).then(res => {
            const { data } = res;
            setLiked(true);
            setDisliked(false);
            refresh()
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
    }

    const handleUndoLike = e => {
        e.preventDefault();

        if (!user) {
            return
        }

        Axios.post(`${APIurl}/like/remove`, {
            postId: post.id,
            userId: user.id
        }).then(res => {
            const { data } = res;
            setLiked(false);
            refresh()
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
    };

    const handleDislike = e => {
        e.preventDefault();

        if (!user) {
            return
        }
        if (liked) {
            handleUndoLike(e);
        }

        Axios.post(`${APIurl}/dislike/add`, {
            postId: post.id,
            userId: user.id
        }).then(() => {
            setDisliked(true);
            setLiked(false);
            refresh();
        }).catch(err => {
            console.error(err)
        })

    }

    const handleUndoDislike = e => {
        e.preventDefault();

        if (!user) {
            return
        }

        Axios.post(`${APIurl}/dislike/remove`, {
            postId: post.id,
            userId: user.id
        }).then(() => {
            setDisliked(false);
            refresh();
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div className="engagement">
            <button onClick={liked ? handleUndoLike : handleLike}><FontAwesomeIcon icon={liked ? fasThumbsUp : faThumbsUp} /></button><code>{post.likes}</code>
            <button onClick={disliked ? handleUndoDislike : handleDislike}><FontAwesomeIcon icon={disliked ? fasThumbsDown : faThumbsDown} /></button><code>{post.unlikes}</code>
        </div>
    )
}

export default Engagement