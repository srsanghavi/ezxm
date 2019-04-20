import React, { Component } from 'react';
import AddClass from './AddClass';
import ClassStore from '../../Stores/ClassStore';
import ClassActions from '../../Actions/ClassActions';


export default class Classes extends Component{
    constructor(props){
        super(props);
        this.state={
            classes:[],
        }

        this.onClassesChanged = this.onClassesChanged.bind(this);
    }

    componentWillMount(){
        ClassStore.addClassesChangedListner(this.onClassesChanged);
        ClassActions.fetchClasses();
    }
    
    componentWillUnmount(){
        ClassStore.removeClassesChangedListener(this.onClassesChanged);
    }

    onClassesChanged(){
        let classes = ClassStore._getClasses();
        this.setState({
            classes: classes,
        })
    }
    
    render(){

        const ret = this.state.classes.map(c => {
            return(
             <tr>
                 <th scope="row">{c.class_id}</th>
                 <td>{c.classname}</td>
                 <td>{c.starttime}</td>
                 <td>{c.endtime}</td>
                 <td>{c.coursename}</td>
                 <td>{c.studentcount}</td>
                 <td>{c.instructorcount}</td>
                 <td><a href={c.class_id}>Details</a></td>
             </tr>
            )
         })


        return(
            <div>
                 <h3>Classes</h3>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Course Name</th>
                        <th scope="col"># of Students</th>
                        <th scope="col"># of Instructor</th>
                        <th></th>
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
                     <AddClass/>
            </div>
        )
    }
}