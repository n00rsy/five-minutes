import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import socket from "../util/socketConfig"
import { Button, Form } from 'react-bootstrap'

class SubmissionForm extends Component {


  constructor(props) {
    super(props);
    this.state = { name: '', message: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cookies = new Cookies()
    if (this.cookies.get('submittedForm') === undefined) {
      this.cookies.set('submittedForm', false)
    }
    this.submittedForm = (this.cookies.get('submittedForm') === "true") ? true : false
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

    //check if submission is valid
    if(this.state.name.length==0 || this.state.message.length==0){
      alert("Cannot submit with empty fields!")
      return;
    }

    if(this.state.name.length >50 || this.state.message.length>500){
      alert("name or message too long!")
      return;
    }

    socket.emit('form-submit', this.state);
    //set cookie that expires in 1 hour
    var datetime = new Date();
    console.log(datetime)
    datetime.setHours(datetime.getHours() + 1);
    //this.cookies.set('submittedForm', true, { expires: datetime })
    this.submittedForm = true;
    this.forceUpdate()
  }

  /*
        <form onSubmit={this.handleSubmit}>
          <label> Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></label>
          <label>Message: <textarea name="message" value={this.state.message} onChange={this.handleChange}></textarea></label>
          <input type="submit" value="Submit" />
        </form>
  */

  render() {
    if (!this.submittedForm) {
      return (
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group >
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Enter Message (500 character maximum)" name="message" value={this.state.message} onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
  </Button>
        </Form>
      )
    }
    else {
      return null;
    }
  }
}
export default SubmissionForm;