import React, {Component} from 'react';
import axiosApi from "../axios-api";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Spinner from "../components/UI/Spinner/Spinner";

class About extends Component {
    state = {
      about: null,
      editing: false,
      loading: false,
    };

    async componentDidMount() {
      this.setState({loading: true});

      const response = await axiosApi.get('/about.json/');
      const dataToSet = Object.values(response.data)[0].text;

      this.setState({about: dataToSet, loading: false})
    };

    formSubmitHandler = async e => {
      e.preventDefault();
      this.setState({loading: true});
      await axiosApi.patch(`about/-LwZCr5CkE0-UBGWhOvy/.json`, {text: this.state.about});
      this.setState({editing: false, loading: false});
    this.props.history.push('/about/')
  };

  inputChangeHandler = e =>
    this.setState({about: e.target.value});

  openEditor =()=> this.setState({editing: true});

  render() {
    return this.state.about && (
        <Container style={{paddingTop: '40px'}}>
          <p>{this.state.about}</p>
          <Button onClick={this.openEditor} color='primary'>Edit</Button>
          {this.state.editing && (
              <Form onSubmit={this.formSubmitHandler}>
                <FormGroup>
                  <Label for="about">about</Label>
                  <Input type="textarea" name="about" id="about" placeholder="Edit info"
                         value={this.state.about}
                         onChange={this.inputChangeHandler}/>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
          )}
          {this.state.loading && <Spinner/>}
        </Container>
    );
  }
}

export default About;