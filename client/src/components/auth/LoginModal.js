import React, { useState, useEffect } from "react";
import {
  NavLink,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  Button,
  Alert,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("HELLO");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.auth.errorMsg, []);
  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = {
      email,
      password,
    };
    console.log(user);
    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        LOGIN
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}> LOGIN </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {localMsg ? <Alert color="warning"> {localMsg} </Alert> : null}
            <FormGroup>
              <Label for="email"> Email </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password"> Password </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button
                color="dark"
                stype={{
                  marginTop: "2rem",
                }}
              >
                LOGIN
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
