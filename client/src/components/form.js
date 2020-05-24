import React, { Component } from 'react';
import socket from "../util/socketConfig"

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state = {name: '', message:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event){
        event.preventDefault();
        socket.emit('form-submit', this.state);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
                <label>Message: <textarea name = "message"value={this.state.message} onChange={this.handleChange}></textarea></label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default Form;