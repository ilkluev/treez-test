import React, {Component} from 'react';
import axios from 'axios';
import Logo from "../../assets/user.svg";
import {Link} from "react-router-dom";
import addressLogo from '../../assets/address.svg';



class DetailedConfiguration extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            configuration: {},
            addresses: [],
            error: false
        }


    }

    componentDidMount() {
        this.requestConfiguration(this.props.match.params.id).then(result => {
            this.setState({
                configuration: result.data.user,
                addresses: result.data.user.addresses
            })
        }, err => {
            this.setState({error: true})
        })
    }

    render() {
        let addressList = this.state.addresses.map((address, index) => {
            return (
                <div key={index} className="row mb-2">
                    <div className="col-1">
                        <img src={addressLogo} width="40px" height="40px" alt="Address Logo"/>
                    </div>
                    <div className="col-9">
                        <div>
                            <span className="font-weight-bold">Country:</span> {address.country}
                        </div>
                        <div>
                            <span className="font-weight-bold">City:</span> {address.city}
                        </div>
                        <div>
                            <span className="font-weight-bold">Street:</span> {address.street}
                        </div>
                        <div>
                            <span className="font-weight-bold">House Number:</span> {address.houseNumber}
                        </div>
                        <div>
                            <span className="font-weight-bold">Zip Code:</span> {address.zipCode}
                        </div>
                    </div>
                </div>)
        });

        return (
            <div className="card p-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            <div>
                                <img src={Logo} width="100px" height="100px" alt="Logo"/>
                            </div>
                        </div>
                        <div className="col-8">
                            <div>
                                <span className="font-weight-bold">First Name:</span> {this.state.configuration.firstName}
                            </div>
                            <div>
                                <span className="font-weight-bold">Last Name:</span> {this.state.configuration.lastName}
                            </div>
                            <div>
                                <span className="font-weight-bold">Email:</span> {this.state.configuration.email}
                            </div>
                            <div>
                                <span className="font-weight-bold">Phone:</span> {this.state.configuration.phone}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div>Addresses</div>
                        <div>{addressList}</div>
                    </div>
                </div>
                <div className="text-right">
                    <Link to="/" className="card-link">Back to list</Link>
                </div>
            </div>
        )
    }

    requestConfiguration(confId) {
        return axios.get(`http://localhost:8080/api/v1/users/${confId}`)
    }
}

export default DetailedConfiguration