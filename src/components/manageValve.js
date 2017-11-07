import React, { Component } from 'react';
import { form } from 'react-bootstrap';
import './CSS/button.css';
import axios from 'axios';

class manageValve extends React.Component {
  constructor() {
    super();
    this.state = {
      optionSelect: '01'
    };
  }

  optionChange(e) {
    const value = e.target.value;
    this.setState({
      optionSelect: value
    });
  }

  optionSubmit(e) {
    axios.get('/', {
       params: {
           optionSelect: this.state.optionSelect
       }
    })

    e.preventDefault();
  }

  render(){
    return(
      <div>
        <hr className="line-style" />
          <form className="form-style" onSubmit={this.optionSubmit.bind(this)}>
            <label>
              <input className="option-input" type="radio" name="status" value="01" checked={this.state.optionSelect==='01'} onChange={this.optionChange.bind(this)} />
              เปิดการจ่ายน้ำ&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              <input className="option-input" type="radio" name="status" value="00" checked={this.state.optionSelect==='00'} onChange={this.optionChange.bind(this)} />
              ปิดการจ่ายน้ำ&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              <input className="option-input" type="radio" name="status" value="10" checked={this.state.optionSelect==='10'} onChange={this.optionChange.bind(this)} />
              เปิดการทำงานอัตโนมัติ&nbsp;&nbsp;
            </label>
              <button className="button1">ยืนยัน</button>
          </form>
        <hr className="line-style" />
      </div>
    );
  }
}
export default manageValve;
