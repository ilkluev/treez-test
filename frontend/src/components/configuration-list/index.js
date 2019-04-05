import React, {Component} from 'react';
import Configuration from '../configuration'
import axios from "axios";

class ConfigurationList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentPage: 0,
            totalNumber: 0,
            pageSize: 10,
            configurations: []
        };
    }

    componentDidMount() {
        this.requestConfigurations().then(result => {
            if(result.status === 200) {
                this.setState({configurations: result.data._embedded.userDtoList})
            }
        })
    }

    render() {
        let configList = this.state.configurations.map(config => {
            return <div key={config.id}><Configuration configuration={config}/></div>
        });

        return (
            <div>
                {configList}
            </div>
        )
    }

    requestConfigurations() {
        return axios.get('http://localhost:8080/api/v1/users');
    }
}

export default ConfigurationList