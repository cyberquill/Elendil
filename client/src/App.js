import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/Auth Actions';
import { getCreateInstructor } from './redux/actions/Instructor Actions';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------
import Footer from './components/layout/Footer';

import Dashboard from './components/routes/instructor/Dashboard';

import Home from './components/routes/Home';
import SignUp from './components/routes/SignUp';
import Login from './components/routes/Login';
import NotFound from './components/routes/NotFound';
//===================================================================================
//check for token:
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    store.dispatch(getCreateInstructor(decoded.id));
}
//===================================================================================

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
                <Footer />
            </Provider>
        );
    }
}

export default App;
