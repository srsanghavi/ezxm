import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InstructorClasses from './InstructorClasses';
import InstructorClass from './InstructorClass';
import InstructorExam from './InstructorExam';




class InstructorHome extends Component{
    constructor(props){
        super(props);
        this.state={
           user: {
               firstName: "",
               lastName: "",
               idUser: -1,
           },
        }
        this._onProfileChanged = this._onProfileChanged.bind(this);
        this.signout = this.signout.bind(this);
    }

    componentWillMount(){
        if(!localStorage.getItem("userid")){
            this.props.history.replace("./signin");            
        }
        else{
            AuthStore.addProfileChangeListener(this._onProfileChanged);
            // console.log(AuthStore._getUserid().userid);
            AuthActions.getUser(AuthStore._getUserid());
        }
    }

    componentWillUnmount(){
        AuthStore.removeProfileChangeListener(this._onProfileChanged);
    }
    
    _onProfileChanged(){
        var _user = AuthStore._getUser();
        this.setState({
            user: _user,
        })
    }

    signout(){
        localStorage.clear();
        window.location.href = "/";

    }

    render(){
        var styles1 = {
           
            // border: 'solid 1px',
            borderColor: '#999',
            borderRadius:'5px',
            padding: '20px',
          };

        var styleContainer = {
            paddingTop:'50px',
        }

        var tab = {
            width: "100%",
            paddingTop:"140px",
            paddingBottom:"140px",
            borderRadius: "20px;",
            fontSize: '30px',
        }
        return(
            <div>
                <Navbar name={this.state.user.firstName+" "+this.state.user.lastName}
                        onSignOut={this.signout}
                        page={"Instructor home"}/>
                <div className="container" style={styleContainer}>
                <Router>
                    {/* <Route exact path="/admin/user/" component={User}/>
                    <Route exact path="/admin/course/" component={Courses} userid={this.state.user.idUser}/>
                    <Route exact path="/admin/class/:id" component={ClassDetails} />
                    <Route exact path="/admin/class/" component={Classes} />
                    */}
                    <Route exact path="/instructor/class/:id" component={InstructorClass}/>
                    <Route exact path="/instructor/class" component={InstructorClasses}/>
                    <Route exact path="/instructor/exam/:examid" component={InstructorExam}/>
                    <Route exact path="/instructor/" component={InstructorClasses}/> 
                </Router>        
                </div>
            </div>
        )
    }
}

export default InstructorHome;