import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import Navbar from '../Template/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from '../Admin/UserList';
import ClassStore from '../../Stores/ClassStore';
import ClassActions from '../../Actions/ClassActions';
import ClassExams from './ClassExams';
import AddExam from './AddExam';




export default class InstructorClass extends Component{
    constructor(props){
        super(props);
        this.state={
            classname:"",
            starttime:"",
            endtime:"",
            coursename:"",
            studentcount:"",
            instructorcount:"",
            allusers:[],
            instructors:[],
            Students:[],
        }
        this.onClassChange = this.onClassChange.bind(this);
        this.onClassUsersChange = this.onClassUsersChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount(){
        ClassStore.addClassChangeListner(this.onClassChange);
        ClassStore.addClassUserChangeListner(this.onClassUsersChange);
        ClassActions.getClass(this.props.match.params.id);
    }

    componentWillUnmount(){
        ClassStore.removeClassChangeListener(this.onClassChange);
        ClassStore.removeClassUserChangeListner(this.onClassUsersChange);
    }

    onClassChange(){
        let ezxmclass = ClassStore.getClass();


        this.setState({
           classname:ezxmclass.classname,
           starttime:new Date(ezxmclass.starttime),
           endtime:ezxmclass.endtime,
           coursename:ezxmclass.coursename,
           studentcount:ezxmclass.studentcount,
           instructorcount:ezxmclass.instructorcount,

        })

        ClassActions.getClassInstructorss(this.props.match.params.id);
        ClassActions.getClassStudents(this.props.match.params.id);
    }

    onClassUsersChange(){
        let classStudents = ClassStore.getClassStudents();
        let classInst = ClassStore.getClassIns();
        this.setState({
            instructors:classInst,
           Students: classStudents,
           instructorcount:classInst.length,
           studentcount: classStudents.length
        })
    }

    onAdd(e){
        alert("Instructors can not perform this action, contact Admin!!");
    }
    render(){
        let formStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"5px",
        })

        let divStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"5px",
            margin:"0px"
        })
        return (
            <div className="row">
                <div className="col col-md-6 border-right">
                    <h3>Showing details for class: {this.state.classname}</h3>
                    <form style={formStyle}>
                        <div className="row">
                            <div className="col">
                                <label for="name">Class Name</label>
                                <input type="text" className="form-control" value={this.state.classname} id="name" disabled/>
                            </div>
                            <div className="col">
                                <label for="coursename">Course Name</label>
                                <input type="text" className="form-control" value={this.state.coursename} id="coursename" disabled/>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col">
                                <label for="startdate">Start Date</label>
                                <input type="text" className="form-control" value={this.state.starttime} id="startdate" disabled/>
                            </div>
                            <div className="col">
                                <label for="enddate">End Date</label>
                                <input type="text" className="form-control" value={this.state.endtime} id="enddate" disabled/>
                            </div>
                        </div>
                        
                        <div>
                            <div className="col">
                                <label for="insnum"># of Instructors</label>
                                <input type="text" className="form-control" value={this.state.instructorcount} id="insnum" disabled/>
                            </div>
                            <div className="col">
                                <label for="stdnum"># of Students</label>
                                <input type="text" className="form-control" value={this.state.studentcount} id="stdnum" disabled/>
                            </div>
                        </div>

                    </form>
                    <br/>
                    <div style={divStyle} className="row">
                            <div className="col col-md-6">
                                <h6>Current Instructors</h6>
                                <UserList 
                                        users={this.state.instructors}
                                        onClick={this.onAdd}
                                        operation={"delete"}
                                        />
                            </div>

                            <div className="col col-md-6">
                                <h6>Current Students</h6>

                                <UserList 
                                        users={this.state.Students}
                                        onClick={this.onAdd}
                                        operation={"delete"}
                                        />
                            </div>
                    </div>
                </div>
                <div className="col col-md-6 border-left">
                    <h3>Exams for this class</h3>
                    <div className="row">
                        <ClassExams classid={this.props.match.params.id}></ClassExams>
                    </div>
                    <br/>
                    <div className="row">
                        <AddExam classid={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        );
    }
}