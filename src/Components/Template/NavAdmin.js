import React, { Component } from 'react';

export default class NavAdmin extends Component{

    render(){   
         return(
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item ">
                        <a className="nav-link" href="/admin/user/">User <span className="sr-only">(current)</span></a>
                    </li> 
                    
                    <li className='nav-item'>
                        <a className='nav-link' href='/admin/course/'>Courses</a>
                    </li>

                    <li class='nav-item'>
                        <a className='nav-link' href='/admin/class/'>Class</a>
                    </li>
            </ul>
         )
    }

};