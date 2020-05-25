import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import socket from "../util/socketConfig"

class Form extends Component {


  constructor(props) {
    super(props);
    this.state = { name: '', message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cookies = new Cookies()

    if (this.cookies.get('submittedForm') === undefined) {
      this.cookies.set('submittedForm', false)
    }
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('form-submit', this.state);

    //set cookie that expires in 1 hour
    var datetime = new Date();
    datetime.setHours(datetime.getHours() + 1);
    this.cookies.set('submittedForm', true, { expires: datetime })
    this.render()
  }
  render() {
    console.log(this.cookies.get('submittedForm'))
    if ((this.cookies.get('submittedForm')) === "false") {
      return (
        <form onSubmit={this.handleSubmit}>
          <label> Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></label>
          <label>Message: <textarea name="message" value={this.state.message} onChange={this.handleChange}></textarea></label>
          <input type="submit" value="Submit" />
        </form>
      )
    }
    else {
      return null;
    }
  }
}
export default Form;