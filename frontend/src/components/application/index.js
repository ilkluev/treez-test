import React, {Component} from 'react';
import ConfigurationList from '../configuration-list'
import DetailedConfiguration from '../detailed-configuration'
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Route} from "react-router-dom";

class Application extends Component  {
    render() {
        return (
            <Router>
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-3">User Configuration</h1>
                    </div>
                    <Route path="/" component={ConfigurationList} exact={true} />
                    <Route path="/user/:id" component={DetailedConfiguration} />
                </div>
            </Router>

        )
    }
}

export default Application