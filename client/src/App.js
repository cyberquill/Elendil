import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/User Actions';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------

import NotFound     from './React Components/pages/NotFound';
import Home         from './React Components/pages/Home';
import Signup       from './React Components/pages/Signup';
import Login        from './React Components/pages/Login';
import Dashboard    from './React Components/pages/Dashboard';
import Course       from './React Components/pages/Course';
import Lecture      from './React Components/pages/Lecture';
import Discussion   from './React Components/pages/Discussion';

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
