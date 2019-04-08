import React, {Component} from 'react';
import addLogo from "../../assets/add_user.svg";
import removeLogo from "../../assets/add_user.svg";
import axios from "axios";
import './style.css';
import {Link} from "react-router-dom";
import ValidatedInput from '../validated-input'
import Formsy from 'formsy-react';

class ConfigurationEditor extends Component{


    constructor(props, context) {
        super(props, context);

        this.state = {
            userId: -1,
            isEditable: false,
            savedSuccessfully: true,
            canSubmit: false,
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            addresses: [{
                country: "",
                city: "",
                street: "",
                houseNumber: "",
                zipCode: ""
            }]
        };

        this.onAddAddressClick = this.onAddAddressClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);

    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.requestConfiguration(this.props.match.params.id).then(result => {
                this.setState({
                    userId: this.props.match.params.id,
                    firstName: result.data.user.firstName,
                    lastName: result.data.user.lastName,
                    emailAddress: result.data.user.email,
                    phoneNumber: result.data.user.phone,
                    addresses: result.data.user.addresses
                })
            })
        }
    }

    render() {
        let renderedAddresses = this.renderAddresses(this.state.addresses);
        return (
            <div className="form-group">
                <div className="text-right">
                    <Link to="/" className="card-link">Back to list</Link>
                </div>
                {!this.state.savedSuccessfully ?
                    <div className="text-center alert alert-danger" role="alert">
                        <h3>An error occurred on server side!!!</h3>
                    </div> : null}
                <form class="needs-validation" novalidate>
                    <div className="configuration-edit_form-field">
                        <label htmlFor="firstName">First Name<span className="text-danger">*</span></label>
                        <input value={this.state.firstName} onChange={(event) => {
                            this.setState({
                                firstName: event.target.value
                            })
                        }} type="text" className="form-control" id="firstName" placeholder="First name"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                        <input value={this.state.lastName} onChange={(event) => {
                            this.setState({
                                lastName: event.target.value
                            })
                        }} type="text" className="form-control" id="lastName" placeholder="Last name"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="emailAddress">Email Address</label>
                        <input value={this.state.emailAddress} onChange={(event) => {
                            this.setState({
                                emailAddress: event.target.value
                            })
                        }} type="email" className="form-control" placeholder="Email Address" id="emailAddress"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input value={this.state.phoneNumber} onChange={(event) => {
                            this.setState({
                                phoneNumber: event.target.value
                            })
                        }} type="text" className="form-control" placeholder="Phone Number" id="phoneNumber"/>
                    </div>
                    <div className="">
                        <div>Addresses</div>
                        <div>
                            <button type="button" onClick={this.onAddAddressClick} className="configuration-list_action-header_add-button">
                                <img src={addLogo} alt="Add address"/> Add address
                            </button>
                        </div>
                        {renderedAddresses}
                    </div>
                    <button onClick={this.onFormSubmit} type="button" className="btn btn-primary btn-raised mt-3">Submit</button>
                </form>

            </div>
        )
    }

    renderAddresses(addresses) {

        let renderedAddresses = addresses.map((address, index) => {
            return (
                <div key={index} className="configuration-edit_address-block mb-3">
                    <div className="text-right">
                        <button type="button" onClick={() => {
                            if(this.state.addresses.length > 1) {
                                let tmpAddresses = this.state.addresses;
                                tmpAddresses.splice(index, 1);

                                this.setState({
                                    addresses: tmpAddresses
                                })
                            }
                        }} className="configuration-list_action-header_add-button">
                            <img src={removeLogo} alt="Remove address"/> Remove
                        </button>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="country">Country<span className="text-danger">*</span></label>
                        <input type="text" value={this.state.addresses[index].country} onChange={ (event) => {
                            let tmpAddresses = this.state.addresses;
                            tmpAddresses[index].country = event.target.value;

                            this.setState({
                                addresses: tmpAddresses
                            })
                        }} className="form-control" placeholder="Country" id="country"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="city">City<span className="text-danger">*</span></label>
                        <input type="text" value={this.state.addresses[index].city} onChange={ (event) => {
                            let tmpAddresses = this.state.addresses;
                            tmpAddresses[index].city = event.target.value;

                            this.setState({
                                addresses: tmpAddresses
                            })
                        }} className="form-control" placeholder="City" id="city"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="street">Street<span className="text-danger">*</span></label>
                        <input type="text" value={this.state.addresses[index].street} onChange={ (event) => {
                            let tmpAddresses = this.state.addresses;
                            tmpAddresses[index].street = event.target.value;

                            this.setState({
                                addresses: tmpAddresses
                            })
                        }} className="form-control" placeholder="Street" id="street"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="houseNumber">House Number<span className="text-danger">*</span></label>
                        <input type="text" value={this.state.addresses[index].houseNumber} onChange={ (event) => {
                            let tmpAddresses = this.state.addresses;
                            tmpAddresses[index].houseNumber = event.target.value;

                            this.setState({
                                addresses: tmpAddresses
                            })
                        }} className="form-control" placeholder="House Number" id="houseNumber"/>
                    </div>
                    <div className="row configuration-edit_form-field">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input type="text" value={this.state.addresses[index].zipCode} onChange={ (event) => {
                            let tmpAddresses = this.state.addresses;
                            tmpAddresses[index].zipCode = event.target.value;

                            this.setState({
                                addresses: tmpAddresses
                            })
                        }} className="form-control" placeholder="Zip Code" id="zipCode"/>
                    </div>
                </div>
            )
        });

        return renderedAddresses;
    }

    onAddAddressClick() {
        let tmpAddresses = this.state.addresses;
        tmpAddresses.unshift({
            country: "",
            city: "",
            street: "",
            houseNumber: "",
            zipCode: ""
        });

        this.setState({
            addresses: tmpAddresses
        })
    }

    onFormSubmit() {
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.emailAddress,
            phone: this.state.phoneNumber,
            addresses: this.state.addresses
        };

        if(this.state.userId !== -1) {
            axios.put(`http://localhost:8080/api/v1/users/${this.state.userId}`, user).then(result => {
                this.props.history.push("/");
            }, error => {
                this.setState({
                    savedSuccessfully: false
                });

                setTimeout(() => {
                    this.setState({
                        savedSuccessfully: true
                    });
                }, 10000)
            })
        } else {
            axios.post("http://localhost:8080/api/v1/users", user).then(result => {
                this.props.history.push("/");
            }, error => {
                this.setState({
                    savedSuccessfully: false
                });

                setTimeout(() => {
                    this.setState({
                        savedSuccessfully: true
                    });
                }, 10000)
            })
        }
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    requestConfiguration(confId) {
        return axios.get(`http://localhost:8080/api/v1/users/${confId}`)
    }
}

export default ConfigurationEditor