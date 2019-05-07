import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/User Actions';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Course from './components/Course';
import Lecture from './components/Lecture';
import Discussion from './components/Discussion';

//===================================================================================
//check for token:
if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    if(Date.now() < decoded.exp) {
        store.dispatch(setCurrentUser(decoded));
        setAuthToken(localStorage.jwtToken);
    }
}
//===================================================================================

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/dashboard/course" component={Course} />
                        <Route exact path="/dashboard/course/lectures" component={Lecture} />
                        <Route exact path="/dashboard/course/discussion" component={Discussion} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
