import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import './CSS/button.css';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

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
    }
};

class manageUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      loading: true
    };
  }
  componentDidMount() {
    setTimeout(()=>{
      axios.get('http://127.0.0.1/ProjectReact/fetchUser.php')
        .then(res => {
          console.log(res.data);
          this.setState({user: res.data, loading:false}) })
        .catch(err => { throw err; });
    },1000);
  }
  render(){
    let content,contentData;
    if (this.state.loading) {
      content = <div>Loading...</div>;
    }else{
      contentData = this.state.user.map((user, index) =>
        <div key={index}>
          <Container>
            <Row className="border">
              <Col xs={1}>{user.UserID}</Col>
              <Col xs={2}>{user.Username}</Col>
              <Col xs={2}>{user.Password}</Col>
              <Col xs={3}>{user.Name}</Col>
              <Col xs={1}>{user.Status}</Col>
              <Col xs={1}></Col>
              <Col xs={1}><Link to={{ pathname:'/UpdateUser', query: {UserID:user.UserID,Username:user.Username,Password:user.Password,Name:user.Name,Status:user.Status } }}><button className="clrLink"><span className="glyphicon glyphicon-pencil"></span> แก้ไข</button></Link></Col>
              <Col xs={1}><Link to={{ pathname:'/deleteUser', query: {UserID:user.UserID,Username:user.Username,Password:user.Password,Name:user.Name,Status:user.Status } }}><button className="clrLink"><span className="glyphicon glyphicon-trash"></span> ลบ</button></Link></Col>
            </Row>
          </Container>
        </div>
      );
    }
    return(
      <div style={styles.fontAll}>
      <br/><br/>
      {content}
        <h1 style={styles.fontHead}>จัดการข้อมูลผู้ใช้งาน</h1>
        <br/>
        <Container>
          <Row>
            <Col xs={10} className="borderCon">
              <Row className="border" style={{backgroundColor: '#f2f2f2'}}>
                <Col xs={12}><Link to="/insertUser"><button className="clrLink"><span className="glyphicon glyphicon-plus"></span> เพิ่มข้อมูลผู้ใช้งาน</button></Link></Col>
              </Row>
              <Row className="border">
                <Col xs={1}>ลำดับ</Col>
                <Col xs={2}>ชื่อผู้ใช้</Col>
                <Col xs={2}>รหัส</Col>
                <Col xs={3}>ชื่อ-นามสกุล</Col>
                <Col xs={1}>สถานะ</Col>
                <Col xs={1}></Col>
              </Row>
              <Row>
                {contentData}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default manageUser;
