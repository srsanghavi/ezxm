import React, { Component } from 'react';
import ExamStore from '../../Stores/ExamStore';
import ExamActions from '../../Actions/ExamActions';
import StudentResult from './StudentResult';
import OmrSheet from './OmrSheet';
import StudentActions from '../../Actions/StudentActions';




export default class StudentExam extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            date:"",
            answerkey:"",
            createdBy:"",
            students:[],
            numberOfQuestion:0,
            
        }
        this.onExamReceived= this.onExamReceived.bind(this);
        this.onAnswerKeyUpdated = this.onAnswerKeyUpdated.bind(this);

        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerKeyChange = this.handleAnswerKeyChange.bind(this);

        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    }

    componentDidMount(){
        ExamStore.addExamChangeListner(this.onExamReceived);
        ExamStore.addExamUpdateListener(this.onAnswerKeyUpdated);
        ExamActions.getStudentExam(this.props.match.params.examid);
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
            students:e.Student,
            numberOfQuestion:e.numberOfQuestion,
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

    handleAnswerSubmit(ans){
        console.log(ans);
        StudentActions.submitExamAnswers(this.props.match.params.examid,ans.toLowerCase());
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
                    <p><b>Number Of Questions:</b>{this.state.numberOfQuestion}</p>
                    
                    <p><b>AnswerKey:</b>
                        {this.state.answerkey}
                    </p>

                </div>
                <div id="exam-results border-right" className="col col-md-8">
                    <div className={this.state.answerkey==null  ? 'hideen' : ''}>
                        <StudentResult students={students}/>
                    </div>
                    <div className={this.state.answerkey!==null  ? 'hideen' : ''}>
                        <OmrSheet numberOfQuestion={this.state.numberOfQuestion} onSubmit={this.handleAnswerSubmit}></OmrSheet>
                    </div>
                </div>
                
            </div>
        )
    }
}