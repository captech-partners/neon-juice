import React from 'react';

const NewTemplate = () => {

    state = {
        dataLabel: "",
        dataPage: "",
        template: "",
        content: "",
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <form>
                <input 
                    name="dataLabel"
                    placeholder="Data Label" 
                    value={this.state.dataLabel} 
                    onChange={e => this.change(e)}
                />
                <input 
                    name="dataPage"
                    placeholder="Data Page" 
                    value={this.state.dataPage} 
                    onChange={e => this.change(e)}
                />
                <input 
                    name="template"
                    placeholder="Template" 
                    value={this.state.template} 
                    onChange={e => this.change(e)}
                />
                <input 
                    name="content"
                    placeholder="Content" 
                    value={this.state.content} 
                    onChange={e => this.change(e)}
                />
                <button onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
        );
    }
};

export default NewTemplate;
