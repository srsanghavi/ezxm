import React, { Component } from 'react';
import AuthActions from '../../Actions/AuthActions';
import AuthStore from '../../Stores/AuthStore';
import CourseStore from '../../Stores/CourseStore';
import CourseActions from '../../Actions/CourseActions';




class Courses extends Component{
    constructor(props){
        super(props);
        this.state={
           courses:[],
           newcourse:{
               name:''
           },
           edit:{
               idCourse:-1,
               name:'',
               createdBy:-1,
           },
        }

        this._onCoursesChanged = this._onCoursesChanged.bind(this);
        this._onCourseDelete = this._onCourseDelete.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this._onEditPressed = this._onEditPressed.bind(this);
        this.editCourseChange = this.editCourseChange.bind(this);
    }

    componentWillMount(){
        CourseStore.addCoursesChangeListner(this._onCoursesChanged);
        CourseActions.fetchCourses();
    }

    componentWillUnmount(){
        CourseStore.removeCoursesChangeListner(this._onCoursesChanged);
    }

    _onCoursesChanged(){
        this.setState({
            courses: CourseStore._getCourses(),
        })
    }

    _onCourseDelete(id){
        CourseActions.deleteCourse(id);        
    }

    handleNameChange(e){
        this.setState({
            newcourse:{
                name: e.target.value,
            }
        })
    }

    _onEditPressed(c){
        if(this.state.edit.idCourse==c.idCourse){
            CourseActions.updateCourse(this.state.edit.idCourse,this.state.edit.name);
            this.setState({
                edit:{
                    idCourse:-1,
                    name:'',
                    createdBy:-1,
                },
            });
        }
        else{
            this.setState({
                edit: c
            })
        }
    }

    editCourseChange(e){
        this.setState({
            edit:{
                idCourse: this.state.edit.idCourse,
                name:e.target.value,
                createdBy: this.state.edit.createdBy,
            }
        })
    }

    addCourse(){
        if(this.state.newcourse.name!=''){
            CourseActions.addCourse(AuthStore._getUserid(),this.state.newcourse.name);
        }else{
            alert("Enter valid course name");
        }
    }
    render(){
        let formStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"20px",
        })

        const ret = this.state.courses.map(c => {
           return(
            <tr>
                <th scope="row">{c.idCourse}</th>
                <td>
                    {this.state.edit.idCourse!=c.idCourse ? c.name : 
                        <input type="text" value={this.state.edit.name} onChange={this.editCourseChange}/>
                    }
                </td>
                <td>{c.createdBy}</td>
                <td><button className="btn btn-primary" onClick={() => this._onEditPressed(c)}>{this.state.edit.idCourse==c.idCourse?'Save':'Edit'}</button></td>
                <td><button className="btn btn-danger" onClick={() => this._onCourseDelete(c.idCourse)}> DELETE </button></td>
            </tr>
           )
        })
        return(
            <div>
                <h3>Courses</h3>

                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">CreatedBy</th>
                    <th scope="col">Edit?</th>
                    <th scope="col">Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {ret}
                </tbody>
                </table>

                <hr
                style={{
                        color: 'black',
                        backgroundColor: '#aaa',
                        height: '2px',
                        borderRadius: '2px',
                    }}
                />                
                <form style={formStyle}>
                <h2 for="name">Add Course</h2>

                    <div class="row form-group">
                        <div className="col">
                            <input type="text" class="form-control" id="cname" value={this.state.newcourse.name} placeholder="Enter Course name"
                                    onChange={this.handleNameChange}/>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.addCourse}>Create Course</button>


                </form>
            </div>
        )
    }

}

export default Courses;