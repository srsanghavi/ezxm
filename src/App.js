import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import AdminHome from './Components/AdminHome';
import InstructorHome from './Components/Instructor/InstructorHome';
import StudentHome from './Components/Student/StudentHome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/signin/" component={Signin} />
          <Route exact path="/signup/" component={Signup} />
          <Route path="/admin/" component={AdminHome} />
          <Route path="/instructor/" component={InstructorHome}/>
          <Route path="/student/" component={StudentHome}/>
          <Route exact path="/" component={Home}/>
        </Router>
        {/* <Route path="/" exact component={Index} /> */}
      </div>
    );
  }
}

export default App;
