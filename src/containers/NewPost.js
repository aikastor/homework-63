import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axiosApi from "../axios-api";
import {CATEGORIES} from "../constants";

class NewPost extends Component {
  state = {
    title: '',
    text: '',
    category: CATEGORIES[0],
  };

  inputChangeHandler = e => this.setState({[e.target.name]: e.target.value});

  formSubmitHandler = async e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      text : this.state.text,
      category: this.state.category,
      time: new Date(),
    };

    await axiosApi.post('/posts.json', newPost);
    this.props.history.push('/');
  };
  render() {
    return (
        <div>
          <h1>New Post</h1>
          <Form onSubmit={this.formSubmitHandler}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Enter Post Title"
                      value={this.state.title}
                      onChange={this.inputChangeHandler}/>
            </FormGroup>
            <FormGroup>
              <Label for="post">Post content</Label>
              <Input type="textarea" name='text' id='text' placeholder="Enter Post Text"
                      value={this.state.text}
                     onChange={this.inputChangeHandler}/>
            </FormGroup>
            <FormGroup>
              <Label for="category">Select category</Label>
              <Input type="select" name="category" id="category" value={this.state.category}
                      onChange={this.inputChangeHandler}>
                {CATEGORIES.map(c=>(<option key={c} value={c}>{c}</option>))}
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
    );
  }
}

export default NewPost;