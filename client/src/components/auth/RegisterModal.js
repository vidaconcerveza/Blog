import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";
import {
  FormGroup,
  Modal,
  NavLink,
  Form,
  ModalBody,
  ModalHeader,
  Label,
  Button,
  Alert,
  Input,
} from "reactstrap";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [localMsg, setLocalMsg] = useState("");
  const errorMsg = useSelector((state) => state.auth.errorMsg);

  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        REGISTER
        <Modal isOpen={modal} toggle={handleToggle}>
          <ModalHeader toggle={handleToggle}> REGISTER </ModalHeader>
          <ModalBody>
            {localMsg ? <Alert color="danger"> {localMsg} </Alert> : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="name"> Name </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={onChange}
                ></Input>
                <Label for="email"> Email </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                ></Input>
                <Label for="password"> Password </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                ></Input>
                <Button color="dark" className="mt-2" block>
                  REGISTER
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </NavLink>
    </div>
  );
};

export default RegisterModal;
