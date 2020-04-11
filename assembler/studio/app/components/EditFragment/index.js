import React from 'react';
import ReactDOM from 'react-dom';

class EditFragment extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            dataLabel: "",
            dataPage: "",
            template: "",
            content: ""
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
                <h1 align="center">Edit Fragment</h1>
                <p>Data Label:
                    <input
                        name="dataLabel"
                        placeholder="Data Label"
                        value={this.state.dataLabel}
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
                <p>Template:
                    <input
                        name="template"
                        placeholder="Template"
                        value={this.state.template}
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
                <button onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }
};

export default EditFragment;
