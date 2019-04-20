import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from '../Admin/UserList';
import ClassStore from '../../Stores/ClassStore';
import ClassActions from '../../Actions/ClassActions';
import ExamStore from '../../Stores/ExamStore';
import ExamActions from '../../Actions/ExamActions';




export default class StudentClassExams extends Component{
    constructor(props){
        super(props);
        this.state={
            exams:[],
        }
        this.onExamsChanged=this.onExamsChanged.bind(this);
    }

    componentDidMount(){
        ExamStore.addExamsChangeListerner(this.onExamsChanged);
        ClassActions.fetchExams(this.props.classid);
    }

    componentWillUnmount(){
        ExamStore.removeExamsChangeListener(this.onExamsChanged);
    }

    onExamsChanged(){
        let exams = ExamStore.getExams();
        this.setState({
            exams:exams,
        })
    }

    handleDelete(id){
        console.log(id);
        ExamActions.deleteExam(id);
    }
    render(){
        let exams=this.state.exams.map(e => {
            return (
                <li className="list-group-item md-auto">
                    <a href={"/student/exam/"+e.idExam}>{e.exam_name}</a>
                </li>
            )
        })
        return(
            <ul className="col col-md-10 offset-md-1 list-group">
                {exams}
            </ul>
        )
    }

}