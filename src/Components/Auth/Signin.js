import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';




class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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


    handleLogin(e){
        e.preventDefault();

        AuthActions.signin(this.state.email,this.state.password);
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
                    <h3>Easy Exam Login</h3>
                <div className="col col-md-6 offset-md-3" style={styles1}>
                    <form>
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
                    
                        <button type="submit" class="btn btn-primary" onClick={this.handleLogin}>Submit</button>
                    </form>
                    
                </div>
                <br/>
                <a href="/signup">
                        Create Account
                    </a>
                
            </div>
        )
    }
}

export default Signin;