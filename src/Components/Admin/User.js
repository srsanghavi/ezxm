import React, { Component } from 'react';
import UserActions from '../../Actions/UserActions';
import UserStore from '../../Stores/UserStore';
import AuthStore from '../../Stores/AuthStore';


export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            selectedUser:{
                idUser:-1,
                isAdmin:false,
                firstName:"",
                lastName:"",
                email:"",
            }
        }

        this.onUsersChange = this.onUsersChange.bind(this);

        this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentWillMount(){
        UserStore.onUsersChangedListener(this.onUsersChange);
        UserActions.fetchUsers();
    }

    componentWillUnmount(){
        UserStore.removeUsersChangedListener(this.onUsersChange);

    }

    onUsersChange(){
        let users = UserStore.getUsers();
        console.log(users);
        
        this.setState({
            users: users,
        })
    }

    handleChangeAdmin(u){

        let user = {
            idUser: u.idUser,
            firstName: u.firstName,
            lastName: u.lastName,
            isAdmin: !u.isAdmin,
        }        
        UserActions.updateUser(user);
    }

    handleDeleteUser(u){
        if(u.idUser===AuthStore._getUserid()){
            alert("Can not delete account for yourself!");
            return;
        }
        UserActions.deleteUser(u.idUser);
    }

    render(){
        let ret = this.state.users.map(u => {
            return(
             <tr>
                 <th scope="row">{u.idUser}</th>
                 <td>
                    {u.firstName}
                 </td>
                 <td>
                    { u.lastName}
                 </td>
                 <td>
                    <button className="btn btn-primary" 
                            onClick={() => this.handleChangeAdmin(u)}>
                        {u.isAdmin?'Yes':'No'}
                    </button>
                 </td>
                 <td>
                    <button className="btn btn-danger" 
                            onClick={() => this.handleDeleteUser(u)}>
                        Delete
                    </button>
                 </td>
             </tr>
            )
         })
        return(
            <div>
                <h3>Users</h3>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Admin?</th>
                        <th scope="col">Delete?</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ret}
                    </tbody>
                    </table>
            </div>
        );
    }
}