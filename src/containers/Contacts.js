import React, {Component} from 'react';
import axiosApi from "../axios-api";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Spinner from "../components/UI/Spinner/Spinner";

class Contacts extends Component {
  state = {
    email: '',
    phone: '',
    telegram: '',
    editing: false,
    loading: false,
  };

  async componentDidMount() {
    const response = await axiosApi.get('/contacts.json/');
    const dataToSet = Object.values(response.data)[0];

    this.setState({ email: dataToSet.email,
                          phone: dataToSet.phone,
                          telegram: dataToSet.telegram,
                          loading: false})
  };

  formSubmitHandler = async e => {
    e.preventDefault();
    this.setState({loading: true});
    const dataToSet = {
      email: this.state.email,
      phone: this.state.phone,
      telegram: this.state.telegram
    };
    await axiosApi.patch(`contacts/-LwZE1Kv21kRs1dCQpW/.json`, dataToSet);
    this.setState({editing: false, loading: false});
    this.props.history.push('/contacts/')
  };

  inputChangeHandler = e =>
      this.setState({[e.target.name]: e.target.value});

  openEditor =()=> this.setState({editing: true});

  render() {
    return  ( this.state.telegram && this.state.email && this.state.phone &&
        <Container style={{paddingTop: '40px'}}>
          <p><b>Email: </b>{this.state.email}</p>
          <p><b>Phone: </b>{this.state.phone}</p>
          <p><b>Telegram: </b>{this.state.telegram}</p>
          <Button onClick={this.openEditor} color='primary'>Edit</Button>

          {this.state.editing && (
              <Form onSubmit={this.formSubmitHandler}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input type="email" name="email" id="email" placeholder="Edit email"
                         value={this.state.email}
                         onChange={this.inputChangeHandler}/>
                </FormGroup>
                <FormGroup>
                  <Label for="phone">phone</Label>
                  <Input type="phone" name="phone" id="phone" placeholder="Edit phone"
                         value={this.state.phone}
                         onChange={this.inputChangeHandler}/>
                </FormGroup>
                <FormGroup>
                  <Label for="telegram">telegram</Label>
                  <Input type="text" name="telegram" id="telegram" placeholder="Edit tg username"
                         value={this.state.telegram}
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

export default Contacts;