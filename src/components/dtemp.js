import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import { form, FieldGroup,ControlLabel,FormControl  } from 'react-bootstrap';
import {FormGroup, HelpBlock, Button} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {promise} from 'react-promise';
import './temp.css';
import './CSS/button.css';
import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css';
import Valve from './manageValve';
import { Link } from 'react-router-dom';

const styles = {
    fontHead:{
      fontFamily: 'supermarket',
      fontSize:30,
    },
    fontAll:{
      fontFamily: 'supermarket',
      fontSize:20,
    }
};

class Dtemp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        data: '',
        select: this.props.location.query.sen_select,
        date: moment().format('YYYY-MM-DD'),
        format: "YYYY-MM-DD",
        inputFormat: "DD/MM/YYYY",
        mode: "date",
        submit:'',
        loading: true
      };
    }

    setdata() {
      var myData = this.props.data.resultDB;
      var refetch = this.props.realtimedata.reFetch;
      //console.log(myData);
      this.setState({
        data:myData,
        fetch:refetch,
        loading:false
      });
    }

    componentDidMount(){

      setTimeout(()=>{
        this.setdata()
      },1000);
      setTimeout(()=>{
        axios.get('http://127.0.0.1/ProjectReact/dstatic.php', {
           params: {
               select: this.state.select,
               date : this.state.date
           }
        }).then(res => {
            //console.log(res.data);
            this.setState({data: res.data}) })
          .catch(err => { throw err; });
      },1500);
      setInterval(()=>{
        //this.props.setData(this.state.tbname)
      },10000);
    }

    onChange(newDate) {
      return this.setState({date:newDate});
    }

    handleSubmit(e) {
      e.preventDefault();
      axios.get('http://127.0.0.1/ProjectReact/dstatic.php', {
         params: {
             select: this.state.select,
             date : this.state.date
         }
      }).then(res => {
          //console.log(res.data);
          this.setState({data: res.data}) })
        .catch(err => { throw err; });
      }

    render() {

        const mr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],length=this.state.data.length;
        const tr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        const ts2=[70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70]
        const ts1=[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]

        if (this.state.loading) {
          var dateTime = ['DD','MM','YY'];

        } else {

            var dateTime= this.state.data[0].datetime;
            dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
            dateTime = dateTime[0].split("-");
            dateTime[2] = Number(dateTime[2]);
            dateTime[1] = Number(dateTime[1]);
            dateTime[0] = Number(dateTime[0]);
            for (var i=0;i<length&&i<=23;i++){
              mr.splice(i,1,Number(this.state.data[i].moisture))
              tr.splice(i,1,Number(this.state.data[i].temperature))
            }

        }

        const configTemp = {
                    title: {
                        text: '<span style="font-family:supermarket;font-size:26px;color:black">กราฟแสดงผลอุณหภูมิแบบรายวัน</span>'
                    },

                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    yAxis: {
                        title: {
                            text:'<span style="font-family:supermarket;font-size:16px;color:silver">Temperature (C)</span>'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080',
                        }]

                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                      series: {
                          pointStart: Date.UTC(dateTime[0],dateTime[1]-1,dateTime[2],0,0,0),
                          pointInterval: 3600 * 1000 // every hour in day
                      }
                    },
                    series: [{
                          name:'<span style="font-family:supermarket;font-size:16px;color:black">อุณหภูมิ</span>',
                          data: tr,
                          color: '#71c73e'
                    }, {
                          name:'<span style="font-family:supermarket;font-size:16px;color:black">ค่าเส้นขีดแบ่ง</span>',
                          data: ts1,
                          color: '#FF0000'
                    }]
                    }
        const configMois = {
                    title: {
                        text: '<span style="font-family:supermarket;font-size:26px;color:black">กราฟแสดงผลความชื้นแบบรายวัน</span>'
                    },

                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    yAxis: {
                        title: {
                            text:'<span style="font-family:supermarket;font-size:16px;color:silver">Moisture (%)</span>'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080',
                        }]

                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                      series: {
                          pointStart: Date.UTC(dateTime[0],dateTime[1]-1,dateTime[2],0,0,0),
                          pointInterval: 3600 * 1000 // every hour in day
                      }
                    },
                    series: [{
                          name:'<span style="font-family:supermarket;font-size:16px;color:black">ความชื้น</span>',
                          data: mr
                    }, {
                          name:'<span style="font-family:supermarket;font-size:16px;color:black">ค่าเส้นขีดแบ่ง</span>',
                          data: ts2,
                          color: '#FF0000'
                    }]
                    }

      const {date, format, mode, inputFormat} = this.state;
      return(
        <div className="body-style" style={styles.fontAll}>
        <Valve/>
        <button className="bt-sensor" disabled><span className="glyphicon glyphicon-stats"></span> รายวัน</button>&nbsp;
        <Link to={{ pathname:'/wtemp' , query: {sen_select:this.state.select} }}><button className="bt-sensor"><span className="glyphicon glyphicon-stats"></span> รายสัปดาห์</button></Link>&nbsp;
        <Link to={{ pathname:'/mtemp' , query: {sen_select:this.state.select} }}><button className="bt-sensor"><span className="glyphicon glyphicon-stats"></span> รายเดือน</button></Link>&nbsp;
        <br/><br/>
          <div>
            <form onSubmit={this.handleSubmit.bind(this)} method='post'>
              <ControlLabel>เลือกวันที่</ControlLabel>
              <FormGroup>
                <DateTimeField
                  dateTime={date}
                  format={format}
                  viewMode={mode}
                  inputFormat={inputFormat}
                  defaultText="Please select a date"
                  onChange={this.onChange.bind(this)}

                />
              </FormGroup>
              <button className="button1">โหลดข้อมูล</button>
            </form>
          <p>&nbsp;</p>
          </div>
            <ReactHighcharts config={configTemp} ref="chart"></ReactHighcharts><br/>
            <ReactHighcharts config={configMois} ref="chart"></ReactHighcharts>
        </div>
        )
      }
  }

const mapStateToProps = (state) => {
  return{
    user: state.user,
    data: state.db,
    realtimedata: state.fetch
  };
};
const mapDispatchToprops = (dispatch) => {
  return{
      setData : () =>{
        dispatch({
          type: "FETCH_DB",
          payload : new Promise((resolve,reject) => {
            setTimeout(() => {
              resolve(this.state.data)
              //console.log(resolve);
            },500)
          })
        })
      }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(Dtemp));
