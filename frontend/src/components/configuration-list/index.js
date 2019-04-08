import React, {Component} from 'react';
import Configuration from '../configuration'
import axios from "axios";
import './style.css';
import addUserLogo from '../../assets/add_user.svg';

export default class ConfigurationList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentPage: 0,
            totalElements: 0,
            totalPages: 0,
            pageSize: 3,
            configurations: []
        };

        this.increasePage = this.increasePage.bind(this);
        this.decreasePage = this.decreasePage.bind(this);
        this.onAddUserClick = this.onAddUserClick.bind(this);
    }

    componentDidMount() {
        this.requestConfigurations(this.state.currentPage, this.state.pageSize)
    }

    render() {
        let configList = this.state.configurations.map(config => {
            return <div key={config.id}><Configuration configuration={config}/></div>
        });

        let pages = [...Array(this.state.totalPages).keys()].map(page => {
            return (<li className={page === this.state.currentPage ? "active page-item" : "page-item"} key={page}>
                        <button className="page-link"
                            onClick={() => {
                                if (page >= 0 && page < this.state.totalPages) {
                                    this.setState({
                                        currentPage: page
                                    });

                                    this.requestConfigurations(page, this.state.pageSize)
                                }
                            }}>{page + 1}</button>
                    </li>)
        });

        return (
            <div>
                <div className="configuration-list_action-header">
                    <div>
                        <button onClick={this.onAddUserClick} className="configuration-list_action-header_add-button">
                            <img src={addUserLogo} alt="Add user"/> Add user
                        </button>
                    </div>
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end m-0">
                                <li onClick={this.decreasePage}
                                    className={this.state.currentPage === 0 ? "page-item disabled" : "page-item"}>
                                    <button className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </button>
                                </li>
                                {pages}
                                <li onClick={this.increasePage}
                                    className={this.state.currentPage === (this.state.totalPages - 1) ? "page-item disabled" : "page-item"}>
                                    <button className="page-link" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div>
                    {configList}
                </div>
            </div>
        )
    }

    requestConfigurations(page, size) {
        axios.get(`http://localhost:8080/api/v1/users?page=${page}&size=${size}`).then(result => {
            if (result.status === 200) {

                this.setState({
                    configurations: result.data._embedded ? result.data._embedded.userDtoList : [],
                    totalElements: result.data.page.totalElements,
                    totalPages: result.data.page.totalPages

                })
            }
        })
    }

    increasePage() {
        if (this.state.currentPage < this.state.totalPages - 1) {
            let newPage = this.state.currentPage + 1;
            this.setState({
                currentPage: newPage
            });

            this.requestConfigurations(newPage, this.state.pageSize)
        }
    }

    decreasePage() {
        if (this.state.currentPage > 0) {
            let newPage = this.state.currentPage - 1;
            this.setState({
                currentPage: newPage
            });

            this.requestConfigurations(newPage, this.state.pageSize)
        }
    }

    onAddUserClick(){
        this.props.history.push("/editor/add")
    }
}
