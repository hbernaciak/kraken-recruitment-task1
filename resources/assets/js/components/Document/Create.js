import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};

        this.handleName = this.handleName.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleFile(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = new FormData();

        form.append('name', this.state.name);
        form.append('filename', this.state.file);

        let uri = 'http://localhost:8000/documents';
        axios.post(uri, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            browserHistory.push('/index');
        }).catch(error => {
            console.log(error.response.data.errors);
        });
    }

    render() {
        return (
            <div>
                <h1>Upload file</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>File display name:</label>
                                <input type="text" className="form-control" onChange={this.handleName}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Select file:</label>
                                <input type="file" className="form-control col-md-6" onChange={this.handleFile}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <button className="btn btn-primary">Upload</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Create;
