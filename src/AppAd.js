import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routing-config';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavBar.css';
import Logo from './image/65old.png';

const styles = {
    font:{
      fontFamily: 'supermarket',
      fontSize:18,
    },
    fontAll:{
      fontFamily: 'supermarket'
    },
    posiNav:{
      position: "fixed", /* Set the navbar to fixed position */
      top: 0, /* Position the navbar at the top of the page */
      width: "100%",
      zIndex: "1100"
    }
};

class AppAd extends Component {
  render(){
      return(
        <BrowserRouter>
          <div style={styles.font}>
            <Navbar inverse collapseOnSelect style={styles.posiNav}>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/"><img id="logo" src={Logo} /></a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/statebor1">
                      <NavItem eventKey={1} >สถานะอุปกรณ์</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/manageUser">
                      <NavItem eventKey={2} >จัดการข้อมูลผู้ใช้งาน</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                  <LinkContainer to="/" onClick={() => Logout()}>
                    <NavItem eventKey={1} >Logout</NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="App-into">
              <Switch>
                {routes.map((route,index) => (<Route key={index} path={route.path} component={route.component} exact={route.exact} />))}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
    );
    function Logout(){
      window.localStorage.removeItem("session");
      window.location.reload();
    }
  }
}

export default AppAd;
