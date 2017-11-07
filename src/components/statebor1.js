import React, { Component } from 'react';
import on from '../image/on.png';
import off from '../image/off.png';
import field2 from '../image/field2.png';
import m from '../image/m.png';
import t from '../image/t.png';
import v from '../image/v.png';
import mon from '../image/m-on.png';
import ton from '../image/t-on.png';
import von from '../image/v-on.png';
import moff from '../image/m-off.png';
import toff from '../image/t-off.png';
import voff from '../image/v-off.png';
import axios from 'axios';
import ReactDOM from 'react-dom';
import index from './statebor.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {promise} from 'react-promise';
import './CSS/button.css';
import {FormGroup, ControlLabel, Button, FormControl,form} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import Valve from './manageValve';
import tIsOff from '../image/toff.png';
import mIsOff from '../image/moff.png';
import { Link } from 'react-router-dom';

const styles = {
  container:{
    flex: 1
  },
   apDiv5: {
    position: 'absolute',
    width: 182,
    height: 115
    // zIndex: 5,
    // left: 50,
    // top: 120
  },
   apDiv6: {
    position: 'absolute',
    width: 47,
    height: 24,
    zIndex: 1,
    left: 35,
    top: 107
  },
   apDiv7: {
    position: 'absolute',
    width: 45,
    height: 37,
    zIndex: 2,
    left: 83,
    top: 107
  },
   apDiv8: {
    position: 'absolute',
    width: 67,
    height: 33,
    zIndex: 3,
    left: 50,
    top: -45
  },
   apDiv9: {
    position: 'absolute',
    width: 39,
    height: 33,
    zIndex: 4,
    left: 65,
    top: 74
  },
   apDiv10: {
    position: 'absolute',
    width: 40,
    height: 42,
    zIndex: 5,
    left: 84,
    top: 74
  },
  apDiv11: {
    position: 'absolute',
    width: 40,
    height: 44,
    zIndex: 6,
    left: 145,
    top: 40
  },
   apDiv12: {
    position: 'absolute',
    width: 35,
    height: 38,
    zIndex: 7,
    left: 142,
    top: 9
  },
   apDiv13: {
    position: 'absolute',
    width: 53,
    height: 28,
    zIndex: 8,
    left: 38,
    top: 306
  },
   apDiv14: {
    position: 'absolute',
    width: 36,
    height: 33,
    zIndex: 9,
    left: 65,
    top: 272
  },
   apDiv15: {
    position: 'absolute',
    width: 41,
    height: 33,
    zIndex: 10,
    left: 83,
    top: 304
  },
   apDiv16: {
    position: 'absolute',
    width: 41,
    height: 34,
    zIndex: 11,
    left: 85,
    top: 272
  },
  apDiv17: {
    position: 'absolute',
    width: 39,
    height: 38,
    zIndex: 12,
    left: 144,
    top: 213
  },
   apDiv18: {
    position: 'absolute',
    width: 37,
    height: 37,
    zIndex: 13,
    left: 146,
    top: 181
  },

   apDiv: {
    position: 'absolute',
    width: 169,
    height: 302,
    zIndex: 5,
    left: 372,
    top: 152
  },
  apDiv60: {
    position: 'absolute',
    width: 248,
    height: 300
    // zIndex: 6,
    // left: 50,
    // top: 580
  },
  table: {
      border: "1px solid #ddd",
      borderCollapse: 'collapse',
      width: 100,
      textAlign: 'center',
      fontFamily:'supermarket',
      fontSize:16
  },
  td: {
      border: "1px solid #ddd",
      borderCollapse: 'collapse',
      width: 60,
      textAlign: 'center',
      fontFamily:'supermarket',
      fontSize:16,
      padding: 15
  },
  td2: {
      borderCollapse: 'collapse',
      width: 176,
      textAlign: 'center',
      fontFamily:'supermarket',
      fontSize:16,
      padding: 15
  },
  tr:{
      border: "1px solid #ddd",
      borderCollapse: 'collapse',
      textAlign: 'center',
      fontFamily:'supermarket',
      fontSize:16,
      padding: 15

  },
  font:{
    fontFamily: 'supermarket',
    fontSize:30,
  },
  fontAll:{
    fontFamily: 'supermarket',
  }

};

class Statebor1 extends React.Component {
  constructor() {
    super();
    this.state = {
      data_statbor: '',
      data_sensor: '',
      select: 1,
      loading: true
    };
  }

  setdata() {
    var stat_data = this.props.stat.resultSTAT;
    var sen_data = this.props.sensor.resultSensor;
    var refetch = this.props.realtimedata.reFetch;
    this.setState({
      data_statbor:stat_data,
      data_sensor: sen_data,
      fetch:refetch,
      loading:false
    });
  }

  componentDidMount () {
    setTimeout(()=>{
      this.setdata()
    },1000);

    setInterval(()=>{
      //this.props.setData(this.state.tbname)
    },10000);
}

  handleChange(e) {
    const select = e.target.value;
    this.setState({
      select: select
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('http://127.0.0.1/ProjectReact/database1.php')
      .then(res => {
        //console.log(res.data);
        this.setState({data_statbor: res.data}) })
      .catch(err => { throw err; });
    setTimeout(() => {
      axios.get('http://127.0.0.1/ProjectReact/sensor.php')
        .then(res => {
          //console.log(res.data);
          this.setState({data_sensor: res.data}) })
        .catch(err => { throw err; });
    }, 500);
  }

  render(){
    var selected=this.state.select;
    let content;
    var stat_temp1="off",stat_temp2="off",stat_mois1="off",stat_mois2="off",stat_val1="off",stat_val2="off";
    var sen_temp1=0,sen_temp2=0,sen_mois1=0,sen_mois2=0;
    var ch_img1,ch_img2;
    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {
      if (selected==1) {
        stat_temp1=this.state.data_statbor[0].temp1;
        stat_temp2=this.state.data_statbor[0].temp2;
        stat_mois1=this.state.data_statbor[0].mois1;
        stat_mois2=this.state.data_statbor[0].mois2;
        stat_val1=this.state.data_statbor[0].val1;
        stat_val2=this.state.data_statbor[0].val2;
        sen_temp1=this.state.data_sensor[0].temperature;
        sen_temp2=this.state.data_sensor[1].temperature;
        sen_mois1=this.state.data_sensor[0].moisture;
        sen_mois2=this.state.data_sensor[1].moisture;
      }else if (selected==2) {
        stat_temp1=this.state.data_statbor[1].temp1;
        stat_temp2=this.state.data_statbor[1].temp2;
        stat_mois1=this.state.data_statbor[1].mois1;
        stat_mois2=this.state.data_statbor[1].mois2;
        stat_val1=this.state.data_statbor[1].val1;
        stat_val2=this.state.data_statbor[1].val2;
        sen_temp1=this.state.data_sensor[2].temperature;
        sen_temp2=this.state.data_sensor[3].temperature;
        sen_mois1=this.state.data_sensor[2].moisture;
        sen_mois2=this.state.data_sensor[3].moisture;
      }else if (selected==3) {
        stat_temp1=this.state.data_statbor[2].temp1;
        stat_temp2=this.state.data_statbor[2].temp2;
        stat_mois1=this.state.data_statbor[2].mois1;
        stat_mois2=this.state.data_statbor[2].mois2;
        stat_val1=this.state.data_statbor[2].val1;
        stat_val2=this.state.data_statbor[2].val2;
        sen_temp1=this.state.data_sensor[4].temperature;
        sen_temp2=this.state.data_sensor[5].temperature;
        sen_mois1=this.state.data_sensor[4].moisture;
        sen_mois2=this.state.data_sensor[5].moisture;
      }else if (selected==4) {
        stat_temp1=this.state.data_statbor[3].temp1;
        stat_temp2=this.state.data_statbor[3].temp2;
        stat_mois1=this.state.data_statbor[3].mois1;
        stat_mois2=this.state.data_statbor[3].mois2;
        stat_val1=this.state.data_statbor[3].val1;
        stat_val2=this.state.data_statbor[3].val2;
        sen_temp1=this.state.data_sensor[6].temperature;
        sen_temp2=this.state.data_sensor[7].temperature;
        sen_mois1=this.state.data_sensor[6].moisture;
        sen_mois2=this.state.data_sensor[7].moisture;
      }
    }
    //check statebor sensor 1
    if (stat_temp1==="on" && stat_mois1==="on") {
      ch_img1=on;
    }else if (stat_temp1==="on" && stat_mois1==="off") {
      ch_img1=mIsOff;
    }else if (stat_temp1==="off" && stat_mois1==="on") {
      ch_img1=tIsOff;
    }else{
      ch_img1=off;
    }
    //check statebor sensor 2
    if (stat_temp2==="on" && stat_mois2==="on") {
      ch_img2=on;
    }else if (stat_temp2==="on" && stat_mois2==="off") {
      ch_img2=mIsOff;
    }else if (stat_temp2==="off" && stat_mois2==="on") {
      ch_img2=tIsOff;
    }else{
      ch_img2=off;
    }

    return(
<div key={index} className="body-style" style={styles.position} >
{content}
  <Valve/>
  <Container>
    <Row>
      <Col xs={12} md={8} >
        <div style={styles.fontAll}>
          <form onSubmit={this.handleSubmit.bind(this)} >
            <FormGroup controlId="formControlsSelect">
              <ControlLabel style={styles.font}>เลือกบ่อ</ControlLabel>
                <FormControl componentClass="select" onChange={this.handleChange.bind(this)} >
                  <option value="1" >1</option>
                  <option value="2" >2</option>
                  <option value="3" >3</option>
                  <option value="4" >4</option>
                </FormControl>
            </FormGroup>
            <button className="button1">โหลดข้อมูล</button>
          </form>
        </div>
        <p>&nbsp;</p>
      </Col>
    </Row>
    <Row>
      <Col md={12} >
        <div>
          <ControlLabel style={styles.font}>สถานะบ่อเลี้ยง</ControlLabel>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={3} >
        <div style={styles.apDiv5}>
          <div style={styles.apDiv6}><img src={m} width="42" height="21" /></div>
          <div style={styles.apDiv7}><img src={t} width="32" height="31" /></div>
          <div style={styles.apDiv8}><p style={styles.font}>บ่อที่:{selected}</p></div>
          <div style={styles.apDiv9}>
            <img src={ch_img1} width="30" height="30" />
          </div>
          <div style={styles.apDiv18}>
            {(stat_val2 === 'on')
            ? <img src={on} width="30" height="30" />
            : <img src={off} width="30" height="30" />
            }
          </div>
          <div style={styles.apDiv12}>
            {(stat_val1 === 'on')
            ? <img src={on} width="30" height="30" />
            : <img src={off} width="30" height="30" />
            }
          </div>
          <div style={styles.apDiv14}>
            <img src={ch_img2} width="30" height="30" />
          </div>

          <div style={styles.apDiv11}><img src={v} width="29" height="33" /></div>
          <div style={styles.apDiv13}><img src={m} width="42" height="21" /></div>
          <div style={styles.apDiv15}><img src={t} width="32" height="31" /></div>
          <div style={styles.apDiv17}><img src={v} width="29" height="33" /></div>
          <img src={field2} width="150" height="400" /></div>
        </Col>
        <Col md={3} >
          <div className="borderSensor">
            <h1>เซนเซอร์: 1 </h1>
            <h2>อุณหภูมิ: {sen_temp1}</h2>
            <h2>ความชื้น: {sen_mois1}</h2>
            <Link to={{ pathname:'/dtemp' , query: {sen_select:1} }}><button className="bt-sensor"><span className="glyphicon glyphicon-stats"></span> ดูสถิติ</button></Link>
            <br/><br/>
          </div>
          <p></p>
          <div className="borderSensor2">
            <h1>เซนเซอร์: 2 </h1>
            <h2>อุณหภูมิ: {sen_temp2}</h2>
            <h2>ความชื้น: {sen_mois2}</h2>
            <Link to={{ pathname:'/dtemp' , query: {sen_select:2} }}><button className="bt-sensor"><span className="glyphicon glyphicon-stats"></span> ดูสถิติ</button></Link>
            <br/><br/>
          </div>
        </Col>
        <Col md={1} ></Col>
        <Col md={2}>
          <div style={styles.apDiv60}>
            <table style={styles.table}>
              <tbody >
                <tr style={styles.tr}>
                    <td style={styles.td} ><img src={on} width="30" height="30" /></td>
                    <td style={styles.td} ><p>ON</p></td>

                  </tr>
                  <tr style={styles.tr}>
                    <td style={styles.td} ><img src={off} width="30" height="30" /></td>
                    <td style={styles.td} >OFF</td>
                  </tr>

                  <tr style={styles.tr}>
                    <td style={styles.td}><img src={mIsOff} width="30" height="30" /></td>
                    <td style={styles.td} >Soil Moisture sensor is OFF </td>
                  </tr>
                  <tr style={styles.tr}>
                    <td style={styles.td}><img src={tIsOff} width="30" height="30" /></td>
                    <td style={styles.td}>Temperature sensor is OFF </td>
                  </tr>
                </tbody>
              </table>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
          </Col>
          <Col md={3} ></Col>
        </Row>
      </Container><br/><br/><br/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    stat: state.stat,
    sensor: state.sensor,
    realtimedata: state.fetch
  };
};
const mapDispatchToprops = (dispatch) => {
  return{
      setData : () =>{
        dispatch({
          type: "FETCH_STAT",
          payload : new Promise((resolve,reject) => {
            setTimeout(() => {
              resolve(this.state.data_statbor)
              //console.log(resolve);
            },500)
          })
        })
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(Statebor1));
