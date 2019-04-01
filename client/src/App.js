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

import Dashboard from './components/routes/Dashboard';
import Course from './components/routes/Course';
import CourseCreate from './components/routes/Course/CourseCreate';
import Lecture from './components/routes/Lecture';
import LectureCreate from './components/routes/Lecture/LectureCreate';
import QA from './components/routes/QA';

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
    if(decoded.role === 'Instructor')
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
                        <Route exact path="/dashboard/course" component={Course} />
                        <Route exact path="/dashboard/course/create" component={CourseCreate} />
                        <Route exact path="/dashboard/course/lectures" component={Lecture} />
                        <Route exact path="/dashboard/course/lectures/create" component={LectureCreate} />
                        <Route exact path="/dashboard/course/questions" component={QA} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
