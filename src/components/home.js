import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import introPic from './CSS/maejo.png';
import introPic2 from './CSS/bodylogin.jpg';
import './CSS/button.css';

const styles = {
    fontHead:{
      fontFamily: 'supermarket',
      fontSize:30,
      textAlign: 'center',
    },
    fontAll: {
      fontFamily: 'supermarket',
      //fontSize:18
    },
    sizeSlide: {
      margin: 'auto',
      width: '50%',
      position: 'center',
      padding: '10px',
    }
};

class Home extends React.Component {
  render(){
    return(
      <div>
        <br/><br/><br/>
        <div className="bgShodow">
          <br/>
          <h1 style={styles.fontHead}>ยินดีต้อนรับเข้าสู่...</h1>
          <br/>
        </div>
        <br/>
        <div style={styles.sizeSlide}>
          <Carousel className="boxShadow" >
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src={introPic} />
              <Carousel.Caption>
                <h3 style={styles.fontAll}>First slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src={introPic} />
              <Carousel.Caption>
                <h3 style={styles.fontAll}>Second slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500} alt="900x500" src={introPic2} />
              <Carousel.Caption>
                <h3 style={styles.fontAll}>Third slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
export default Home;
