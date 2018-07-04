import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import TableRow from '../TableRow';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', items: ''};

    }

    componentDidMount() {
        axios.get('http://localhost:8000/documents')
            .then(response => {
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        if (this.state.items instanceof Array) {
            return this.state.items.map(function (object, i) {
                return <TableRow obj={object} key={i}/>;
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Uploaded files</h1>

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/add" className="btn btn-success">Upload file</Link>
                    </div>
                </div>
                <br/>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Filename</td>
                        <td>Uploaded At</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Index;
