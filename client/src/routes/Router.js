import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavBar from "../components/AppNavBar";
import { Container } from "reactstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import Search from "./normalRoute/Search";
import PostDetail from "./normalRoute/PostDetail";
import PostWrite from "./normalRoute/PostWrite";
import PostCardList from "./normalRoute/PostCardList";
import CategoryResult from "./normalRoute/CategoryResult";

const MyRouter = () => {
  alert("MyRouter???");
  return (
    <Fragment>
      <AppNavBar> </AppNavBar> <Header> </Header>
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardList}></Route>
          <Route path="/posts" exact component={PostWrite}></Route>
          <Route path="/posts/:id" exact component={PostDetail}></Route>
          <Route path="/search/:searchTerm" exact component={Search}></Route>
          <Route
            path="/posts/category/:categoryName"
            exact
            component={CategoryResult}
          ></Route>
        </Switch>
      </Container>
      <Footer></Footer>
    </Fragment>
  );
};

export default MyRouter;
