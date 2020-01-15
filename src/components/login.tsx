import React from "react";
import { Form, Button, Card, ListGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";
import IGenericAlertProps from "./types/IGenericAlertProps";
import ILoginState from "./types/ILoginState";
import { Text } from "../text";
import "../index.css";

class Login extends React.PureComponent<IGenericAlertProps, ILoginState> {
  public constructor(props: IGenericAlertProps) {
    super(props);
    this.state = {
      nameInput: "",
      ipInput: "",
      machines: []
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeIp = this.handleOnChangeIp.bind(this);
  }
  componentDidMount() {
    fetch("/localNetwork")
      .then(res => res.json())
      .then(machines => this.setState({ machines: JSON.parse(machines) }));
  }

  private handleClickSubmit() {
    if (this.state.nameInput.length === 0) {
      this.props.alert.show(Text.alert.enterName);
    }
    this.setState({ nameInput: "" });
    this.setState({ ipInput: "" });
    localStorage.setItem("name", this.state.nameInput);
    localStorage.setItem("ip", this.state.ipInput);
  }

  private handleOnChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ nameInput: event.currentTarget.value });
  }

  private handleOnChangeIp(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ipInput: event.currentTarget.value });
  }
  render() {
    return (
      <Card className="mt-5 mb-2 mr-5 ml-5">
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{Text.login.name}</Form.Label>
              <input
                type="text"
                placeholder={Text.login.placeholderName}
                className="form-control"
                onChange={this.handleOnChangeName}
              />
              <Form.Label className="mt-2">{Text.login.connect}</Form.Label>
              <p className="font-weight-light font-italic">
              {Text.login.descriptionIp}
              </p>
              <input
                type="text"
                placeholder={Text.login.exempleIp}
                className="form-control"
                onChange={this.handleOnChangeIp}
              />
              <Form.Label className="mt-2">{Text.login.localMachines}</Form.Label>
              <ListGroup>
                {this.state.machines.length ? (
                  this.state.machines.map(machine => (
                    <ListGroup.Item key={machine.name}>
                      {machine.ip}
                      <Badge
                        variant={machine.isOpen ? "success" : "danger"}
                        className="ml-1"
                      >
                        {machine.isOpen ? Text.login.connected : Text.login.disconnected}
                      </Badge>
                    </ListGroup.Item>
                  ))
                ) : (
                  <div className="loader">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                  </div>
                )}
              </ListGroup>
            </Form.Group>
            {this.state.nameInput.length ? (
              <Link to={{ pathname: "/chat" }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleClickSubmit}
                >
                  {Text.login.submit}
                </Button>
              </Link>
            ) : (
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleClickSubmit}
              >
                {Text.login.submit}
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default withAlert()(Login);
