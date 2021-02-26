import React, { createContext, useContext, useState } from 'react';
import Axios from 'axios';

const APIurl = "http://192.168.1.14:3001";
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
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'));

    const signUp = (values) => new Promise((resolve, reject) => {
        const { username, password, email } = values;

        Axios.post(`${APIurl}/user/register`, {
            username: username,
            password: password,
            email: email
        }).then(res => {
            const { username } = res.data;
            return resolve(username);
        }).catch(err => {
            const { status } = err.response;
            if (status === 401) {
                return reject("Username or Email already exists!")
            } else {
                return reject("There was an error with Register. Try again in a few seconds...")
            }
        })
    })

    const signIn = (values) => new Promise((resolve, reject) => {
        const { username, password } = values;

        Axios.post(`${APIurl}/user/login`, {
            username: username,
            password: password
        }).then(res => {
            const { id, username } = res.data;
            setUser({
                id: id,
                username: username
            });
            sessionStorage.setItem('loggedIn', 'true');
            setLoggedIn(true);
            return resolve(username);
        }).catch(err => {
            const { status } = err.response;

            sessionStorage.setItem('loggedIn', 'false');
            setLoggedIn(false);

            switch(status) {
                case 500:
                    return reject("There was an error with Login. Try again in a few seconds...")
                case 401:
                    return reject("Username and Password don't match!")
                default:
                    return reject("Username doesn't exist!")
            }
        })
    })
    const signOut = () => {
        setUser(null);
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', 'false');
    }

    return {
        user: user,
        loggedIn: loggedIn,
        signUp,
        signIn,
        signOut
    }
}
