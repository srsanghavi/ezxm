import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InstructorClasses from './InstructorClasses';
import InstructorClass from './InstructorClass';
import ExamStore from '../../Stores/ExamStore';
import ExamActions from '../../Actions/ExamActions';




export default class InstructorExam extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            date:"",
            answerkey:"",
            createdBy:"",
            students:[],
            
        }
        this.onExamReceived= this.onExamReceived.bind(this);
        this.onAnswerKeyUpdated = this.onAnswerKeyUpdated.bind(this);

        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerKeyChange = this.handleAnswerKeyChange.bind(this);
    }

    componentDidMount(){
        ExamStore.addExamChangeListner(this.onExamReceived);
        ExamStore.addExamUpdateListener(this.onAnswerKeyUpdated);
        ExamActions.getExam(this.props.match.params.examid);
    }
    componentWillUnmount(){
        ExamStore.removeExamChangeListner(this.onExamReceived);
        ExamStore.removeExamUpdatedListner(this.onAnswerKeyUpdated);

    }

    onExamReceived(){
        let e = ExamStore.getExam();
        this.setState({
            name:e.exam_name,
            date:e.date,
            answerkey:e.answerkey,
            createdBy:e.firstname+" "+e.lastname,
            students:e.Students,
        })
    
    }
    
    onAnswerKeyUpdated(){
        ExamActions.getExam(this.props.match.params.examid);
    }

    handleAnswerKeyChange(e){
        e.preventDefault();
        ExamActions.updateAnswerKey(this.props.match.params.examid,this.state.answerkey);
    }

    handleAnswerChange(e){
        e.preventDefault();
        this.setState({
            answerkey:e.target.value
        })
    }


    marks(studentanswers){
        let answerkey = this.state.answerkey.split(",");
        studentanswers = studentanswers.split(",");
        var i,mark=0;
        for (i = 0; i < answerkey.length; i++) { 
            if(studentanswers[i]===answerkey[i]){
                mark+=1;
            }
        }
        return mark;
    }

    render(){
        let x = 0;
        let students = this.state.students.map(s => {
            x = x+1;
            return (
                <tr>
                    <th scope="row">{x}</th>
                    <td>{s.StudentFirstName+" "+s.StudentLastName}</td>
                    <td>{s.answerkey}</td>
                    <td>{this.marks(s.answerkey)}</td>
                </tr>
            )
        })
        return(
            <div className="row">
                <div id="exam-detais" className="col col-md-4 border-right">
                    <h3>Exam Details</h3>
                    <p><b>Name:</b>{this.state.name}</p>
                    <p><b>Date:</b>{this.state.date}</p>
                    <p><b>Created By:</b>{this.state.createdBy}</p>
                    <p><b>AnswerKey:</b>
                        <textarea className="form-control" value={this.state.answerkey} onChange={this.handleAnswerChange}>
                            
                        </textarea>
                    </p>
                    <button className="btn btn-primary" onClick={this.handleAnswerKeyChange}>Update</button>

                </div>
                <div id="exam-results border-right" className="col col-md-8">
                    <h3>Results</h3>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Answers</th>
                            <th scope="col">Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}