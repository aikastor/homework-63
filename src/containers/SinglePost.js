import React, {Component} from 'react';
import axiosApi from "../axios-api";
import {Badge, Button} from "reactstrap";
import {Link} from "react-router-dom";



class SinglePost extends Component {
  state = {
    post: null
  };

  getCurrentPostLink = () => {
    const id = this.props.match.params.id;
    return '/posts/' + id + '.json';
  };

  async componentDidMount() {
    const response = await axiosApi.get(this.getCurrentPostLink());
    this.setState({post: response.data})
  }

  deletePost = async () => {
    await axiosApi.delete(this.getCurrentPostLink());
    this.props.history.replace('/');
  };

  render() {

    return  this.state.post && (
      <div>
        <h1>{this.state.post.title}</h1>
        <p style={{fontVariant: 'italic'}}>Category: {this.state.post.category}</p>
        <p>{this.state.post.text}</p>
        <Badge color="primary">
          {new Date(Date.parse((this.state.post.time))).toLocaleString()}
        </Badge>
        <hr/>
        <p>
          <Button color='danger' style={{marginRight: '8px'}} onClick={this.deletePost}>Delete</Button>
          <Button tag={Link} to={`/posts/${this.props.match.params.id}/edit/`} color='primary'>Edit</Button>
        </p>
        <hr/>
      </div>
    )
  }
}

export default SinglePost;