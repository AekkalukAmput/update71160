import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes2 from './routing-config2';
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
    }
};

class App extends Component {
  render(){
      return(
        <BrowserRouter>
          <div style={styles.font}>
            <Navbar inverse collapseOnSelect>
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
                </Nav>
                <Nav pullRight>
                  <LinkContainer to="/" onClick={() => Logout()}>
                    <NavItem eventKey={2} >Logout</NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="App-into">
              <Switch>
                {routes2.map((route,index) => (<Route key={index} path={route.path} component={route.component} exact={route.exact} />))}
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

export default App;
