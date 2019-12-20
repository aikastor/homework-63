import React, {Fragment} from 'react';
import Container from "reactstrap/es/Container";
import Navigation from "./components/UI/Navigation/Navigation";
import {Route, Switch} from "react-router-dom";
import Posts from "./containers/Posts";
import NewPost from "./containers/NewPost";
import SinglePost from "./containers/SinglePost";
import EditPost from "./containers/EditPost";
import About from "./containers/About";
import Contacts from "./containers/Contacts";

const App = () => {
  return (
      <Fragment>
        <Navigation/>
        <Container>
          <Switch>
            <Route path='/' exact component={Posts}/>
            <Route path='/posts/:id/edit/' component={EditPost}/>
            <Route path='/categories/:name' component={Posts}/>
            <Route path='/posts/new/' component={NewPost}/>
            <Route path='/posts/:id/' component={SinglePost}/>
            <Route path='/contacts/' component={Contacts}/>
            <Route path='/about/' component={About}/>
            <Route render={()=> <h1>Not found</h1>}/>
          </Switch>
        </Container>
      </Fragment>

  );
};

export default App;