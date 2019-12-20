import React, {Component} from 'react';
import axiosApi from "../axios-api";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {CATEGORIES} from "../constants";

class EditPost extends Component {
  state = {
    title: '',
    text: '',
    category: '',
  };

  getCurrentPostLink = () => {
    const id = this.props.match.params.id;
    return '/posts/' + id + '.json';
  };
  async componentDidMount() {
    const response = await axiosApi.get(this.getCurrentPostLink());
    this.setState({title: response.data.title,
                          text: response.data.text,
                          category: response.data.category})
  };

  inputChangeHandler = e => this.setState({[e.target.name]: e.target.value});

  formSubmitHandler = async e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      text : this.state.text,
      category: this.state.category,
    };

    await axiosApi.patch(this.getCurrentPostLink(), newPost);
    this.props.history.push(`/posts/${this.props.match.params.id}`);
  };

  render() {
    return (
        <div>
          <h1>Edit post</h1>
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

export default EditPost;