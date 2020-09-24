import React, { Fragment, useState, useCallback, useEffect } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";

import { LOGOUT_REQUEST } from "../redux/types";
import { useSelector, useDispatch } from "react-redux";
import { NavItem, Form } from "reactstrap";
const AppNavBar = () => {
  //isOpen = for Collapse
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {};

  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "Admin" ? (
          <Form className="col mt-2">
            <Link
              to="post"
              className="btn btn-success block text-white px-3"
              onclick={addPostClick}
            >
              ADD POST
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem class="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link>
              <Button outline color="light" className="px-3" block>
                <strong> {user ? `Welcome ${user.name}` : ""} </strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong> no user </strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick="onLogout" to="#">
            <Button outline color="light" className="mt-2" block>
              LOGOUT
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal> </RegisterModal>
      </NavItem>
      <NavItem>
        <LoginModal> </LoginModal>
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar color="dark" expand="lg" className="stick-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            SideProject 's Blog
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavBar;
