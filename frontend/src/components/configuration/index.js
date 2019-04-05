import React, {Component} from 'react';
import Logo from '../../assets/user.svg';
import {Link} from "react-router-dom";

class Configuration extends Component {

    render() {
        return (
            <div className="card p-3 mb-3">
                <div className="card-body row">
                    <div className="col-2">
                        <div>
                            <img src={Logo} width="100px" height="100px" alt="Logo"/>
                        </div>
                    </div>
                    <div className="col-8">
                        <div>
                            <span className="font-weight-bold">First Name:</span> {this.props.configuration.firstName}
                        </div>
                        <div>
                            <span className="font-weight-bold">Last Name:</span> {this.props.configuration.lastName}
                        </div>
                        <div>
                            <span className="font-weight-bold">Email:</span> {this.props.configuration.email}
                        </div>
                        <div>
                            <span className="font-weight-bold">Phone:</span> {this.props.configuration.phone}
                        </div>
                    </div>

                </div>
                <div className="text-right">
                    <Link to={`/user/${this.props.configuration.id}`} className="card-link">View details</Link>
                </div>
            </div>
        )
    }

}

export default Configuration