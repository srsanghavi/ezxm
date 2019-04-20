import React, { Component } from 'react';
import AuthActions from '../Actions/AuthActions';
import AuthStore from '../Stores/AuthStore';
import Courses from './Course/Course';
import Navbar from './Template/Navbar';




class Home extends Component{
    constructor(props){
        super(props);
        this.state={
           user: {
               firstName: "",
               lastName: "",
               idUser: -1,
           },
           role:{
               isAdmin:false,
               isStudent:false,
               isInstructor:false,
           }
        }
        this._onProfileChanged = this._onProfileChanged.bind(this);
        this.signout = this.signout.bind(this);

        this.onRolesChanged = this.onRolesChanged.bind(this);
    }

    componentWillMount(){
        if(!localStorage.getItem("userid")){
            this.props.history.replace("./signin");            
        }
        else{
            AuthStore.addProfileChangeListener(this._onProfileChanged);
            AuthStore.addRoleListener(this.onRolesChanged);
            // console.log(AuthStore._getUserid().userid);
            AuthActions.getUser(AuthStore._getUserid());
            AuthActions.getRole();
        }
    }

    componentWillUnmount(){
        AuthStore.removeProfileChangeListener(this._onProfileChanged);
        AuthStore.removeRoleListener(this.onRolesChanged);
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

    onRolesChanged(){
        let roles = AuthStore.getRoles();
        console.log(roles);
        
        this.setState({
            role:roles,
        })
    }

    render(){
        var styles1 = {
           
            // border: 'solid 1px',
            borderColor: '#999',
            borderRadius:'5px',
            padding: '20px',
          };

        var styleContainer = {
            paddingTop:'150px',
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
                        page={"home"}/>
                <div className="container" style={styleContainer}>
                        {/* <Courses userid={this.state.user.idUser}></Courses> */}
                        <div className="row">
                            <div className={this.state.role.isAdmin ? 'col' : 'hideen'}>   
                                    <a href="/admin" className="btn btn-outline-primary" style={tab}> Admin </a>
                            </div>
                            <div className={this.state.role.isInstructor ? 'col' : 'hideen'}>
                                <a href="/instructor" className="btn btn-outline-primary" style={tab}> Instructor </a>
                            </div>
                            <div className={this.state.role.isStudent  ? 'col' : 'hideen'}>
                                <a href="/student" className="btn btn-outline-primary" style={tab}> Student </a>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Home;