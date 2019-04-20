import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from '../Admin/UserList';
import ClassStore from '../../Stores/ClassStore';
import ClassActions from '../../Actions/ClassActions';
import ClassExams from './ClassExams';
import ExamStore from '../../Stores/ExamStore';




export default class AddExam extends Component{
    constructor(props){
        super(props);
        this.state={
            exam_name:"",
            date:"",
            answerkey:"",
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAnswerKeyChange = this.handleAnswerKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onExamAdded = this.onExamAdded.bind(this);
    }

    componentDidMount(){
        ExamStore.addExamsAddListerner(this.onExamAdded);
    }

    componentWillUnmount(){
        ExamStore.removeExamsAddListener(this.onExamAdded);
    }

    onExamAdded(){
        ClassActions.fetchExams(this.props.classid);
    }
    handleNameChange(e){
        e.preventDefault();
        this.setState({
            exam_name: e.target.value,
        })
    }

    handleDateChange(e){
        e.preventDefault();
        this.setState({
            date: e.target.value,
        })
    }

    handleAnswerKeyChange(e){
        e.preventDefault();
        this.setState({
            answerkey: e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        ClassActions.createExam(this.props.classid,this.state.date,this.state.exam_name,this.state.answerkey);
    }

    render(){
        let formStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"5px",
        })

        return(

            <div className="col col-md-10 offset-md-1" style={formStyle}>
                <h5>Add Exam</h5>
                <form>

                    <div className="col col-md-12 form-group">
                        <lable for="name">Enter Exam Name:</lable>
                        <input className="form-control" type="text" id="name" value={this.state.exam_name} onChange={this.handleNameChange}/>
                    </div>
                    <div className="col col-md-12 form-group">
                        <lable for="date">Enter Exam Date:</lable>
                        <input className="form-control" type="date" id="date" value={this.state.date} onChange={this.handleDateChange}/>
                    </div>
                    <div className="col col-md-12 form-group">
                        <lable for="answer">Enter comma seperated answer key:</lable>
                        <textarea  className="form-control" id="answer" value={this.state.answerkey} onChange={this.handleAnswerKeyChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
                </form>
            </div>

        );
    }
}