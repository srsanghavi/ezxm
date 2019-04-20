import React, { Component } from 'react';


export default class UserList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let users = this.props.users;
        let onClick = this.props.onClick;
        
        let userView = users.map(u => {
            return (
                <li className="list-group-item ">
                    <a href="" className="d-flex justify-content-between align-items-center"
                               onClick={(e) => {e.preventDefault();onClick(u.idUser)}} 
                               title={u.email}>
                            {u.firstName+" "+u.lastName}
                            <span className= {this.props.operation==="delete"?"badge  badge-pill badge-danger":"badge  badge-pill badge-primary"}>{this.props.operation==="delete"?"-":"+"}</span>
                        </a>
                </li>
            )
        })
        
        return(
            <ul class="list-group" >
                {userView}
            </ul>
        )
    }
}

