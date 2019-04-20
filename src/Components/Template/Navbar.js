import React, { Component } from 'react';
import NavAdmin from './NavAdmin';




class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
           
        }

    }

    render(){
        
        return (

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="/">Easy Exam </a>| {this.props.page.split(" ")[0]}
                    <div>{this.props.page==="Admin home"?<NavAdmin/>:''}</div>
                    

                    <span class="nav-item dropdown ml-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.name}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a onClick={this.props.onSignOut} class="dropdown-item" href="#">Sign Out</a>
                        </div>
                        
                    </span>
                </div>
                </nav>

        )
    }

};

export default Navbar;