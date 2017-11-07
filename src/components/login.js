import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {promise} from 'react-promise';
import Logo from './CSS/65old.png';
import axios from'axios';
import LoginCSS from'./CSS/login.css';


class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: ''
        }
    }
    
    signUp() {
        if (this.state.email!=="" && this.state.password !=="") {
          this.props.setUser(this.state.email,this.state.password)
            console.log("ddd");
            //console.log(dec.name);


            console.log('this.state', this.state);
        }else if(this.state.email !== "") {
            alert('Warning! Please enter Password');
        }else if(this.state.password !== "") {
            alert('Warning! Please enter Username');
        }else {
            alert('Warning! Please enter Username and Password');
        }
    }


    render() {
        if( localStorage.getItem("session") !== (this.props.user.resultuser.results) ){
            console.log("ok");
            localStorage.setItem("session", (this.props.user.resultuser.results) );
            this.props.setDataUser(localStorage.getItem("session"));
        }
        return (
          <div className="LoginCSS">
            <div className="bodyLogin"></div>
              <div className="gradLogin"></div>
              <div className="headerLogin">
                <div><img className="logo" src={Logo} /></div>
              </div>
              <br/>
              <div className="login">
                  <input id="email" type="text" placeholder="username" onChange={event => this.setState({email : event.target.value})} /><br/>
                  <input id="password" type="password" placeholder="password" onChange={event => this.setState({password : event.target.value})} /><br/>
                  <button className="input" type="submit" onClick={() => this.signUp()} >Login</button>
              </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.user,
        data: state.db,
        realtimedata: state.fetch
    };
};
const mapDispatchToprops = (dispatch) =>{
    return{
        setUser : (username,password) =>{
            dispatch({
                type: "FETCH_USER",
                payload :new Promise((resolve,reject) => {
                    setTimeout(()=>{
                        resolve(axios.get('http://127.0.0.1/ProjectReact/login.php', {
                            params: {
                                username: username,
                                password: password
                            }
                        })
                            .then(res => {
                                console.log(JSON.stringify(res.data.results));
                                var obj = JSON.parse(JSON.stringify(res.data));
                                console.log(obj.results);
                                obj.results
                                var jwtDecode = require('jwt-decode');
                                var deco = jwtDecode(obj.results);
                                var json_deco = JSON.parse(JSON.stringify(deco));
                                if(json_deco.status === "0"){
                                    alert("รหัสผ่านไม่ถูกต้อง");
                                }
                                return res.data })
                            .catch(err => { throw err; }));
                    },500);
                })
            });

        },

        setDataUser : (jwtcode) =>{
            var jwtDecode = require('jwt-decode');
            dispatch({
                type: "FETCH_DATAUSER",
                payload : jwtDecode(jwtcode)
            });

        }
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToprops)(LoginComponent));
