import React, { Component } from 'react';
import AddClass from './AddClass';
import ClassStore from '../../Stores/ClassStore';
import ClassActions from '../../Actions/ClassActions';
import UserList from './UserList';
import UserActions from '../../Actions/UserActions';
import UserStore from '../../Stores/UserStore';


export default class ClassDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
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

        this.onClassChanged = this.onClassChanged.bind(this);
        this.onUsersChanged = this.onUsersChanged.bind(this);
        this.onClassUsersChanged = this.onClassUsersChanged.bind(this);

        this.onAddStudent = this.onAddStudent.bind(this);
        this.onAddInstructor = this.onAddInstructor.bind(this);

        this.onRemoveStudent = this.onRemoveStudent.bind(this);
        this.onRemoveInstructor = this.onRemoveInstructor.bind(this);


    }
    componentDidMount(){
        UserStore.onUsersChangedListener(this.onUsersChanged);
        UserActions.fetchUsers();

        ClassStore.addClassChangeListner(this.onClassChanged);
        ClassStore.addClassUserChangeListner(this.onClassUsersChanged);
        
        ClassActions.getClass(this.props.match.params.id);
        

    }
    componentWillUnmount(){
        UserStore.removeListener(this.onUsersChanged);
        ClassStore.removeClassUserChangeListner(this.onClassUsersChanged);
        ClassStore.removeClassChangeListener(this.onClassChanged);

    }

    onClassChanged(){
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

    onClassUsersChanged(){
        let classStudents = ClassStore.getClassStudents();
        let classInst = ClassStore.getClassIns();
        this.setState({
            instructors:classInst,
           Students: classStudents,
           instructorcount:classInst.length,
           studentcount: classStudents.length
        })
    }

    onUsersChanged(){
        let users = UserStore.getUsers();
        this.setState({
            allusers:users,
        })
    }

    onAddStudent(uid){
        let cid = this.props.match.params.id;
        ClassActions.addClassStudent(uid,cid);
    }

    onAddInstructor(uid){
        let cid = this.props.match.params.id;
        ClassActions.addClassIns(uid,cid);
    }
    onRemoveStudent(uid){
        let cid = this.props.match.params.id;
        ClassActions.deleteClassStudent(uid,cid);
    }
    onRemoveInstructor(uid){
        let cid = this.props.match.params.id;
        ClassActions.deleteClassIns(uid,cid);
    }
    render(){
        let loadingStyle = ({height:"100vh",width:"100vw"});
        let formStyle=({
            backgroundColor:"#eee",
            padding:"20px",
            borderRadius:"20px",
        })

        let loading = (
            <div style={loadingStyle}>
                <h1>Loading...</h1>
            </div>
        )

        let users = this.state.allusers.filter(u => 
                (!this.state.instructors.map(us=>us.idUser).includes(u.idUser) && 
                !this.state.Students.map(us=>us.idUser).includes(u.idUser)));

        return(
            <div>
                {this.state.classname===""?loading:""}
                <h3>Class details for {this.state.classname}</h3>

                <form style={formStyle} className="col col-md-8 offset-md-2">
                    <div className="row">
                        <div className="col">
                            <label for="name">Class Name</label>
                            <input type="text" className="form-control" value={this.state.classname} id="name"/>
                        </div>
                        <div className="col">
                            <label for="coursename">Course Name</label>
                            <input type="text" className="form-control" value={this.state.coursename} id="coursename" disabled/>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                            <label for="startdate">Start Date</label>
                            <input type="date" className="form-control" value={this.state.starttime} id="startdate" />
                        </div>
                        <div className="col">
                            <label for="enddate">End Date</label>
                            <input type="date" className="form-control" value={this.state.endtime} id="enddate"/>
                        </div>
                    </div>
                    
                    <div className="row">
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
                <br></br>
                <div>
                    <div className="col col-md-8 offset-md-2 row " >
                        <div className="col" style={formStyle}>
                            <h6>Current Instructors</h6>
                            <p>Click remove</p>
                            <UserList 
                                    users={this.state.instructors}
                                    onClick={this.onRemoveInstructor}
                                    operation={"delete"}
                                    />
                        </div>

                        <div className="col offset-md-1" style={formStyle}>
                            <h6>Add Instructors</h6>
                            <p>Click add</p>
                            <UserList 
                                    users={users}
                                    onClick={this.onAddInstructor}
                                    operation={"add"}
                                    />
                           
                        </div>

                    </div>

                    <br></br>
                    <div className="col col-md-8 offset-md-2 row " >
                        <div className="col" style={formStyle}>
                            <h6>Current Students</h6>
                            <p>Click remove</p>

                            <UserList 
                                    users={this.state.Students}
                                    onClick={this.onRemoveStudent}
                                    operation={"delete"}
                                    />
                        </div>
                        
                        <div className="col offset-md-1" style={formStyle}>
                            <h6>Add Students</h6>
                            <p>Click add</p>

                                <UserList 
                                    users={users}
                                    onClick={this.onAddStudent}
                                    operation={"add"}
                                    />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}