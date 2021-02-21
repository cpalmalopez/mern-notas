import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import { AuthContext } from './components/auth/auth';
import CustomAppBar from './components/appbar/AppBar';
import HomePage from './components/homepage/Home';
import PrivateRoute from './components/route_types/PrivateRoute';

function App() {
    const existingToken = localStorage.getItem("token") || "";
    const existingUsername = localStorage.getItem("username") || "";
    const [ authToken, setAuthToken ] = useState(existingToken);
    const [ username, setUsername] = useState(existingUsername);

    const setUserName = (data) => {
        if(!data) {
            localStorage.removeItem('username');
            setUsername();
        } else {
            localStorage.setItem('username', data);
            setUsername(data);
        }
    };

    const setToken = (data) => {
        if(!data) {
            localStorage.removeItem('token');
            setAuthToken();
        } else {
            localStorage.setItem('token', JSON.stringify(authToken));
            setAuthToken(data);
        }
    }

    return (
        <AuthContext.Provider value={{authToken, setAuthToken: setToken, username, setUserName: setUserName}}>
            <div>
                <BrowserRouter>
                <CustomAppBar />
                    <Switch>
                        <Route exact path="/" component={AuthForm} />
                        <Route exact path="/login" component={AuthForm} />
                        <Route exact path="/signup" component={AuthForm} />
                        <PrivateRoute exact path="/home" component={HomePage} />
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    )
}

export default App;