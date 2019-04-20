import AuthStore from "../Stores/AuthStore";

export default class Api {
    // Initializing important variables
    constructor(domain) {
        // 192.168.0.14:3000
        this.domain = domain || 'http://ec2-18-223-155-37.us-east-2.compute.amazonaws.com:3000/api/' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        // this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}signin/`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            // this.setToken(res.userid) // Setting the token in localStorage            
            return Promise.resolve(res);
        })
    }

    signup(email,password,firstname,lastname){
        return this.fetch(`${this.domain}signup/`,{
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                firstname,
                lastname
            })
        }).then(res => {
            return Promise.resolve(res);
        });
    }
    getRoles(){
        return this.fetch(`${this.domain}roles/`,{
            method: 'GET',
        }).then(res => {
            return Promise.resolve(res);
        });
    }

    getUser(userid){
        return this.fetch(`${this.domain}user/${userid}`,{
            method: 'GET',
        }).then(res => {
            return Promise.resolve(res);
        });
    }


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token // handwaiving here
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getCourses(){
        return this.fetch(`${this.domain}course/`,{
            method: 'GET',
        }).then(res => {
            return Promise.resolve(res);
        });
    }

    getCourse(id){
        return this.fetch(`${this.domain}course/${id}`,{
            method: 'GET',
        }).then(res => {
            return Promise.resolve(res);
        });
    }

    updateCourse(id,coursename){
        return this.fetch(`${this.domain}course/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                coursename,
            })
        }).then(res => Promise.resolve(res));
    }

    addCourse(createrid,coursename){
        return this.fetch(`${this.domain}course/`,{
            method: 'POST',
            body: JSON.stringify({
                createrid,
                coursename
            })
        }).then(res => Promise.resolve(res));
    }

    deleteCourse(id){
        return this.fetch(`${this.domain}course/${id}`,{
            method: 'DELETE',
        }).then(res => Promise.resolve(res));
    }

    getUsers(){
        return this.fetch(`${this.domain}users/`,{
            method:'GET',
        }).then(res => Promise.resolve(res));
    }

    updateUser(id,firstname,lastname,isadmin){
        return this.fetch(`${this.domain}user/${id}`,{
            method: 'PUT',
            body: JSON.stringify({
                firstname,
                lastname,
                isadmin,
            })
        }).then(res => Promise.resolve(res));
    }

    deleteUser(id){
        return this.fetch(`${this.domain}user/${id}`,{
            method: 'DELETE',
        }).then(res => Promise.resolve(res));
    }

    addClass(classname,createdby,starttime,stoptime,courseid){
        return this.fetch(`${this.domain}class/`,{
            method:'POST',
            body:JSON.stringify({
                classname,
                createdby,
                courseid,
                starttime,
                stoptime,
            })
        }).then(res => Promise.resolve(res));
    }

    getClasses(){
        return this.fetch(`${this.domain}class/`,{
            method:'GET',
        }).then(res => Promise.resolve(res));
    }

    getClass(id){
        return this.fetch(`${this.domain}class/${id}`,{
            method:'GET',
        }).then(res => Promise.resolve(res));
    }

    getClassInstructors(id){
        return this.fetch(`${this.domain}class/${id}/instructors`,{
            method:'GET'
        }).then(res => Promise.resolve(res));
    }

    getClassStudents(id){
        return this.fetch(`${this.domain}class/${id}/students`,{
            method:'GET'
        }).then(res => Promise.resolve(res));
    }

    addStudentToClass(userid,classid){
        return this.fetch(`${this.domain}class/student`,{
            method:'POST',
            body: JSON.stringify({
                userid,
                classid
            })
        }).then(res => Promise.resolve(res));
    }

    addInstructorToClass(userid,classid){
        return this.fetch(`${this.domain}class/instructor`,{
            method:'POST',
            body: JSON.stringify({
                userid,
                classid
            })
        }).then(res => Promise.resolve(res));
    }

    removeStudentFromClass(userid,classid){
        return this.fetch(`${this.domain}class/student`,{
            method:'DELETE',
            body: JSON.stringify({
                userid,
                classid
            })
        }).then(res => Promise.resolve(res));
    }

    removeInstructorFromClass(userid,classid){
        return this.fetch(`${this.domain}class/instructor`,{
            method:'DELETE',
            body: JSON.stringify({
                userid,
                classid
            })
        }).then(res => Promise.resolve(res));
    }

    getClassesForInstructor(){
        return this.fetch(`${this.domain}instructor/class`,{
            method:"GET",
        }).then(res => Promise.resolve(res));
    }

    getClassesForStudent(){
        return this.fetch(`${this.domain}student/class`,{
            method:"GET",
        }).then(res => Promise.resolve(res));
    }

    getExamsInClass(id){
        return this.fetch(`${this.domain}class/${id}/exam`,{
            method:"GET",
        }).then(res => Promise.resolve(res));
    }

    createExam(id,date,answerkey,name){
        return this.fetch(`${this.domain}class/${id}/exam`,{
            method:"POST",
            body:JSON.stringify({
                date,
                answerkey,
                name
            })
        }).then(res => Promise.resolve(res));
    }

    getExam(id){
        return this.fetch(`${this.domain}exam/${id}`,{
            method:"GET",
        }).then(res => Promise.resolve(res));
    }

    deleteExam(id){
        return this.fetch(`${this.domain}exam/${id}`,{
            method:"DELETE",
        }).then(res => Promise.resolve(res));
    }

    updateAnswerKey(id,answerkey){
        return this.fetch(`${this.domain}exam/${id}`,{
            method:'PUT',
            body: JSON.stringify({
                answerkey
            })
        }).then(res => Promise.resolve(res));
    }

    getStudentExam(id){
        return this.fetch(`${this.domain}student/exam/${id}`,{
            method:"GET",
        }).then(res => Promise.resolve(res));
    }

    submitAnswer(id,answers){
        return this.fetch(`${this.domain}student/exam/${id}`,{
            method:"POST",
            body:JSON.stringify({
                answers
            })
        }).then(res => Promise.resolve(res))
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'userid': AuthStore._getUserid(),
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Token ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        }) .then(this._checkStatus)
        .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            console.log(response);
            alert(response.statusText);
            throw JSON.stringify({});
            
        }
    }

   
}
