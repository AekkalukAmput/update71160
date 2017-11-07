import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {promise} from 'react-promise';
import './App.css';
import App from './App';
import AppAd from './AppAd';
import LoginComponent from './components/login'


import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';




const history = createHistory();
const middleware = routerMiddleware(history);



class Login extends Component {

constructor() {
    super();
    this.state = {
        status_login : "0"
    }
}



    render() {
        let show ;
        if(this.props.user.datauser.status === "1"){
            show = <ConnectedRouter history={history} >
                    <App />
                    </ConnectedRouter> ;
        }
        else if(this.props.user.datauser.status === "2"){
            show = <ConnectedRouter history={history} >
                    <AppAd />
                    </ConnectedRouter> ;
        }else{
            show = <LoginComponent />;

        }

        return (
            <div>
                {show}
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

    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToprops)(Login));
