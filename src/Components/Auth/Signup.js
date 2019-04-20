import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';




class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            fname:'',
            lname:'',
        }
        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this._onSignInReceived = this._onSignInReceived.bind(this);
    }

    componentWillMount(){
        AuthStore.addSigninListener(this._onSignInReceived);
    }

    componentWillUnmount(){
        AuthStore.removeSigninListener(this._onSignInReceived);
    }
    _onSignInReceived(){
        let userId = AuthStore._getUserid();
        console.log(userId);
        this.props.history.replace("./");            
    }

    handleFnameChange(e){
        this.setState({
            fname:e.target.value,
        })
    }

    handleLnameChange(e){
        this.setState({
            lname:e.target.value,
        })
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value,
        })
    }
    handlePasswordChange(e){
        this.setState({
            password:e.target.value,   
        })
    }


    handleSignup(e){
        e.preventDefault();
        AuthActions.signup(this.state.fname,
                            this.state.lname,
                            this.state.email,
                            this.state.password);
        // AuthActions.signup(this.state.,this.state.password);
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
        return(
            <div className="container" style={styleContainer}>
                    <h3>Easy Exam Sign up</h3>
                <div className="col col-md-8 offset-md-2" style={styles1}>
                    <form>
                        <div class="row form-group">
                            <div className="col">
                                <label for="fname">First name</label>
                                <input type="text" class="form-control" id="fname" value={this.state.fname} placeholder="Enter first name"
                                        onChange={this.handleFnameChange}/>
                            </div>
                            <div className="col">
                                <label for="lname">Last name</label>
                                <input type="text" class="form-control" id="lname" value={this.state.lname} placeholder="Enter last name"
                                        onChange={this.handleLnameChange}/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" value={this.state.email} aria-describedby="emailHelp" placeholder="Enter email"
                                    onChange={this.handleEmailChange}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Password"
                                    onChange={this.handlePasswordChange}
                                    value={this.state.password}/>
                        </div>
                    
                        <button type="submit" class="btn btn-primary" onClick={this.handleSignup}>Create Account</button>
                    </form>
                </div>
                <br/>
                <a href="/signin">
                    Already have an account? Signin.
                </a>
            </div>
        )
    }
}

export default Signup;