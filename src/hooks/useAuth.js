import React, { createContext, useContext, useState } from 'react';
import Axios from 'axios';

const APIurl = "http://localhost:3001";
const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
}

export const AuthProvider = ({ children }) => {
    const authProvider = useAuthProvider();
    return <authContext.Provider value={authProvider}>{children}</authContext.Provider>
}

const useAuthProvider = () => {
    const [user, setUser] = useState(null);

    const signUp = (values) => new Promise((resolve, reject) => {
        const { username, password, email } = values;
        console.log('in promise');
        Axios.post(`${APIurl}/user/register`, {
            username: username,
            password: password,
            email: email
        }).then(res => {
            const { username } = res.data;
            console.log('axios post then');

            setUser(username)
            
            return resolve(username);
        }).catch(err => {
            console.log(err);
            console.error(err);
            const { code } = err;
            switch (code) {
                case 500:
                    return reject("There was an error with Register. Try again in a few seconds...")
                default:
                    return reject("Username or Email already exists!")
            }
        })
    })

    return {
        user,
        signUp
    }
}
