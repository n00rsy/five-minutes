import React, { Component } from 'react';
import socket from "./socketConfig"

class Form extends Component {
    
    handleSubmit(event){
        event.preventDefault();
        console.log("submitted form")
        socket.emit('form-submit', "client submitted from");
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Name:<input type="text" name="name" /></label>
                <label><textarea name = "message"></textarea></label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default Form;