import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InstructorActions from '../../Actions/InstructorActions';
import ClassStore from '../../Stores/ClassStore';
import StudentActions from '../../Actions/StudentActions';




export default class StudentClasses extends Component{
    constructor(props){
        super(props);
        this.state={
            classes:[],
        }
        this.onClassesChanged = this.onClassesChanged.bind(this);
    }

    componentDidMount(){
        ClassStore.addClassesChangedListner(this.onClassesChanged);
        StudentActions.fetchStudentClasses();
    }
    componentWillUnmount(){
        ClassStore.removeClassChangeListener(this.onClassesChanged);
    }

    onClassesChanged(){
        this.setState({
            classes:ClassStore._getClasses(),
        })
    }

    render(){
        let classes = this.state.classes.map(c => {
            return (
                <li class="list-group-item">
                    <a href={"/student/class/"+c.idClass} > {c.className} </a>
                </li>
            )
        })
        return(
            <div>
                <h3>My Classes</h3>
                <ul className="list-group col col-md-8 offset-md-2">
                    {classes}
                </ul>
            </div>
        )
    }
    
}