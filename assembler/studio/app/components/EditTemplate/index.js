import React from 'react';
import ReactDOM from 'react-dom';

class EditTemplate extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            templateName: "",
            content: "",
            dataChild: "",
            dataPage: "",
            dataID: ""
        };
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <form>
                <h1 align="center">Edit Template</h1>
                <p>Template Name:
                    <input
                        size="40"
                        name="templateName"
                        placeholder="Template Name"
                        value={this.state.templateName}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Content:
                    <input
                        name="content"
                        placeholder="Content"
                        value={this.state.content}
                        onChange={e => this.change(e)}
                    />
                </p>
                <h2>Fragment Slot</h2>
                <p>Data Child:
                    <input
                        name="dataChild"
                        placeholder="Data Child"
                        value={this.state.dataChild}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Data Page:
                    <input
                        name="dataPage"
                        placeholder="Data Page"
                        value={this.state.dataPage}
                        onChange={e => this.change(e)}
                    />
                </p>
                <p>Data ID:
                    <input
                        name="dataID"
                        placeholder="Data ID"
                        value={this.state.dataID}
                        onChange={e => this.change(e)}
                    />
                </p>
                <button onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }
};

export default EditTemplate;
