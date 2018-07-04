import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (confirm('Are you sure?')) {
            let uri = `http://localhost:8000/documents/${this.props.obj.id}`;

            axios.delete(uri).then(response => {
                browserHistory.push('/');
                browserHistory.push('index');
            }).catch(error => {
                console.log(error.response.data.errors);
            });
        }

    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.name}.{this.props.obj.extension}
                </td>
                <td>
                    {this.props.obj.created_at}
                </td>

                <td>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Delete" className="btn btn-danger"/>
                    </form>
                </td>
            </tr>
        );
    }
}

export default TableRow;
