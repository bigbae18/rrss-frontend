import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './CreatePost.css';
import validatePost from './PostValidation';

const APIurl = 'http://192.168.1.14:3001';

function CreatePost({ refresh }) {

    const [body, setBody] = useState('');
    const [touched, setTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({})

    const auth = useAuth();

    useEffect(() => {
        if (Object.keys(error).length === 0 && touched) {
            submit();
        }
    }, [error])

    const submit = () => {
        axios.post(`${APIurl}/post/`, {
            author: auth.user.username,
            body: body
        }).then(() => {
            refresh()
            setBody('');
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError(validatePost(body));
    }
    const handleChange = e => {
        setTouched(true);
        setBody(e.target.value)
    }

    return (
        
                <div className="create-post-container">
                    <h1>What happened today?</h1>
                    <textarea value={body} onChange={handleChange} placeholder="Express yourself..." />
                    <p>255 characters max.</p>
                    {error.body && <p className="error-p">{error.body}</p>}
                    <button 
                        type="submit"
                        onClick={e => {
                            handleSubmit(e);
                        }}>Create post!</button>
                </div>
    )
}

export default CreatePost

