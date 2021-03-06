import React, {Component} from 'react';
import axiosApi from "../axios-api";
import {Badge, Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {Link, NavLink} from "react-router-dom";
import {CATEGORIES} from "../constants";
import Spinner from "../components/UI/Spinner/Spinner";

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };
  requestData = async ()=> {
    let url = '/posts.json';

    if(this.props.match.params.name) {
      url += `?orderBy="category"&equalTo="${this.props.match.params.name}"`
    }
    this.setState({loading: true});

    const response = await axiosApi.get(url);

    if (response) {
      this.setState({posts: response.data, loading: false})
    }
  };

  async componentDidMount() {
    this.requestData();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      return this.requestData();
    }
  }

  render() {
    return (
        <Row>
          <Col xs={3}>
            <ul>
              {CATEGORIES.map(c=>(
                  <li key={c}>
                    <NavLink to={'/categories/'+ c}>{c}</NavLink>
                  </li>
              ))}
            </ul>
          </Col>
          <Col xs={9}> {
            !this.state.loading ?
                this.state.posts && Object.keys(this.state.posts).map(id => (
                  <Card>
                    <CardBody>
                      <span><i>created on: </i></span>
                      <Badge color="primary">
                        {new Date(Date.parse((this.state.posts[id].time))).toLocaleString()}
                      </Badge>
                      <CardTitle><h4>{this.state.posts[id].title}</h4></CardTitle>
                      <Button tag={Link} to={'/posts/'+ id}>See more >> </Button>
                    </CardBody>
                  </Card>
              ))
              : <Spinner/>
          }
          </Col>

        </Row>
    );
  }
}

export default Posts;