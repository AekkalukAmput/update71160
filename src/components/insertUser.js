import React, { Component } from 'react';
import { Carousel, Alert, Button } from 'react-bootstrap';
import './CSS/button.css';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import axios from 'axios';
import { Link } from 'react-router-dom';

const styles = {
    fontHead:{
      fontFamily: 'supermarket',
      fontSize:30,
    },
    fontAll: {
      position: 'relative',
      fontFamily: 'supermarket',
      padding: '20px',
      left: '50px',
    },
    btpot: {
      position: 'absolute',
      right: '0px',
    }
};

class insertUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pass: "",
      name: "",
      status: "",
      add: "",
      tel: "",
      loading: true,
      alertVisible: false,
    };
  }
  onChangeUsername(e) {
    this.setState({username:e.target.value});
  }
  onChangePass(e) {
    var pass = e.target.value;
    this.setState({pass:pass});
  }
  onChangeName(e) {
    var name = e.target.value;
    this.setState({name:name});
  }
  onChangeStatus(e) {
    var status = e.target.value;
    this.setState({status:status});
  }
  onChangeAdd(e) {
    var add = e.target.value;
    this.setState({add:add});
  }
  onChangeTel(e) {
    var tel = e.target.value;
    this.setState({tel:tel});
  }
  handleSubmit(e) {
    e.preventDefault();
    setTimeout(()=>{
      axios.get('http://127.0.0.1/ProjectReact/doInsertUser.php', {
         params: {
           username: this.state.username,
           pass: this.state.pass,
           name: this.state.name,
           status: this.state.status,
           add: this.state.add,
           tel: this.state.tel
         }
      }).then(res => {
          console.log(res);
          })
        .catch(err => { throw err; });
    },1000);
    this.handleAlertShow();
  }
  handleAlertShow() {
    this.setState({alertVisible: true});
  }
  render(){
    if (this.state.alertVisible) {
       return (
         <div>
          <br/><br/><br/>
           <div className="alertSty">
             <Alert bsStyle="success">
               <h4 className="alertSty1">เพิ่มข้อมูลเสร็จสมบูรณ์</h4>
               <p className="alertSty1">
                 <Link to='/manageUser'><Button bsStyle="info">ตกลง</Button></Link>
               </p>
             </Alert>
            </div>
          </div>
       );
     }
    return(
      <div style={styles.fontAll}>
      <br/><br/>
        <h1 style={styles.fontHead}>จัดการข้อมูลผู้ใช้งาน</h1>
        <br/>
        <Container>
          <Row>
            <Col xs={10} className="borderCon">
              <Row className="border" style={{backgroundColor: '#f2f2f2'}}>
                <Col xs={12}><span className="glyphicon glyphicon-plus"></span> เพิ่มข้อมูลผู้ใช้งาน</Col>
              </Row>
              <Row className="border">
                <Col xs={3}>ชื่อผู้ใช้</Col>
                <Col xs={3}><input type="text" onChange={this.onChangeUsername.bind(this)} /></Col>
              </Row>
              <Row  className="border">
                <Col xs={3}>รหัส</Col>
                <Col xs={3}><input type="text" onChange={this.onChangePass.bind(this)} /></Col>
              </Row>
              <Row className="border">
                <Col xs={3}>ชื่อ-นามสกุล</Col>
                <Col xs={3}><input type="text" onChange={this.onChangeName.bind(this)} /></Col>
              </Row>
              <Row  className="border">
                <Col xs={3}>สถานะ</Col>
                <Col xs={3}><input type="text" onChange={this.onChangeStatus.bind(this)} /></Col>
              </Row>
              <Row  className="border">
                <Col xs={3}>ที่อยู่</Col>
                <Col xs={3}><input type="text" onChange={this.onChangeAdd.bind(this)} /></Col>
              </Row>
              <Row  className="border">
                <Col xs={3}>เบอร์โทร</Col>
                <Col xs={3}><input type="text" onChange={this.onChangeTel.bind(this)} /></Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row style={{padding:'10px'}}>
            <Col xs={10}>
              <Row>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <Link to='/manageUser'><button className="button1">กลับ</button></Link>
                  <button className="button1" style={styles.btpot} >ยืนยัน</button>
                </form>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default insertUser;
