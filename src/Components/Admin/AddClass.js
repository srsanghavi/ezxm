import React, { Component } from 'react';
import CourseStore from '../../Stores/CourseStore';
import CourseActions from '../../Actions/CourseActions';
import ClassActions from '../../Actions/ClassActions';

export default class AddClass extends Component{
    constructor(props){
        super(props);
        this.state={
            courses:[],
            class:{
                name: "",
                courseid:"",
                startdate:new Date(this),
                enddate: new Date(this),
                createdby: "",
            }
        }
        this.onCoursesChanged = this.onCoursesChanged.bind(this);

        this.onClassNameChanged = this.onClassNameChanged.bind(this);
        this.onClassStartChanged = this.onClassStartChanged.bind(this);
        this.onClassEndChanged = this.onClassEndChanged.bind(this);
        this.onCourseIdChanged = this.onCourseIdChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        CourseStore.addCoursesChangeListner(this.onCoursesChanged);
        CourseActions.fetchCourses();
    }

    componentWillUnmount(){
        CourseStore.removeCoursesChangeListner(this.onCoursesChanged);
    }

    onCoursesChanged(){
        let courses=CourseStore._getCourses();
        this.setState({
            courses: courses,
        })
    }

    onClassNameChanged(e){
        e.preventDefault();
        let _class = this.state.class;
        _class.name = e.target.value;
        this.setState({
            class:_class,
        })
    }

    onCourseIdChanged(e){
        e.preventDefault();
        let _class = this.state.class;
        _class.courseid = e.target.value;
        this.setState({
            class:_class,
        })
    }

    onClassStartChanged(e){
        e.preventDefault();
        let _class = this.state.class;
        _class.startdate = e.target.value;
        this.setState({
            class:_class,
        })
    }

    onClassEndChanged(e){
        e.preventDefault();
        let _class = this.state.class;
        _class.enddate = e.target.value;
        this.setState({
            class:_class,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        ClassActions.addClass(this.state.class);
        
    }
    render(){
        let formStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"20px",
        })

        let courseList = this.state.courses.map(c => {
            return(
                <option value={c.idCourse}>{c.name}</option>
            )
        })
        return(
            <form style={formStyle}>
            <h2 for="name">Add Class</h2>

                <div class="row form-group">
                    <div className="col">
                        <label for="cname">Enter Class Name</label>
                        <input type="text"
                               class="form-control" 
                               id="cname" 
                               placeholder="Enter Class name"
                               value={this.state.class.name}
                               onChange={this.onClassNameChanged}/>
                    </div>
                    <div className="col">
                        <label for="course-select">Select Course</label>
                        <select value={this.state.class.courseid} className="form-control" id="course-select" onChange={this.onCourseIdChanged}>
                            {courseList}
                        </select>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col">
                        <label for="start-date">Enter Start Date</label>
                        <input id="start-date" type="date" className="form-control" value={this.state.class.startdate} onChange={this.onClassStartChanged}/>
                    </div>
                    <div className="col">
                        <label for="end-date">Enter End Date</label>
                        <input id="end-date" type="date" className="form-control" value={this.state.class.enddate} onChange={this.onClassEndChanged}/>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Create Class</button>


            </form>
        );
    }
}