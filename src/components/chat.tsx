import React from "react";
import io from "socket.io-client";
import { Card, Button, Row, Col, Container, Badge } from "react-bootstrap";
import { withAlert } from "react-alert";
import date from "date-and-time";
import { Link } from "react-router-dom";
import _uniqueId from "lodash/uniqueId";
import IChatState from "./types/IChatState";
import { Text } from "../text";
import uniqueId from "./uniqueId";
import IGenericAlertProps from "./types/IGenericAlertProps";

class Chat extends React.PureComponent<IGenericAlertProps, IChatState> {
  public constructor(props: IGenericAlertProps) {
    super(props);
    const name = localStorage.getItem("name");
    this.state = {
      chatMessage: "",
      user: { id: uniqueId(), name: name !== null ? name : "" },
      allUsers: [],
      chatMessages: [],
      socket: io.connect(
        `http://${
          localStorage.getItem("ip") ? localStorage.getItem("ip") : "localhost"
        }:3001`
      )
    };
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.submitChatMessage = this.submitChatMessage.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    this.state.socket.emit("identify", {
      name: this.state.user.name,
      id: this.state.user.id
    });
  }

  componentDidMount() {
    this.state.socket.on("message", (msg: any) => {
      this.setState({
        chatMessages: [
          ...this.state.chatMessages,
          {
            text: msg.text,
            user: msg.user,
            timestamp: msg.timestamp
          }
        ]
      });
    });
    this.state.socket.on("identify", (msg: any) => {
      this.setState({ allUsers: msg });
    });
  }

  private handleOnChangeText(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ chatMessage: event.currentTarget.value });
  }

  private submitChatMessage() {
    if (this.state.chatMessage.length === 0) {
      this.props.alert.show(Text.alert.enterText);
    } else {
      const now = new Date();
      this.state.socket.emit("message", {
        text: this.state.chatMessage,
        user: this.state.user.name,
        timestamp: date.format(now, "D MMM YYYY HH:mm:ss")
      });
      this.setState({ chatMessage: "" });
    }
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.submitChatMessage();
    }
  }

  private goHome() {
    this.state.socket.emit("disconnectChatroom", { ...this.state.user });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <div key={_uniqueId("message-div")}>
        <p key={_uniqueId("message-container")} className="text-left ml-1 mb-0">
          <span
            key={_uniqueId("message-io")}
            className="font-weight-light font-italic font-bold"
          >
            {chatMessage.user}:{" "}
          </span>
          {chatMessage.text}
        </p>
        <p
          key={_uniqueId("message-timestamp")}
          className="text-right mb-0 font-weight-light font-italic font-min-timestamp mr-1"
        >
          {chatMessage.timestamp}
        </p>
        <hr key={_uniqueId("message-hr")} />
      </div>
    ));

    return (
      <Card className="mt-2 mb-2 mr-5 ml-5">
        <Card.Body>
          <Card.Title>
            {Text.chat.chatroom}
            <Link to={{ pathname: "/login" }}>
              <Button
                variant="outline-secondary"
                onClick={this.goHome}
                className="btn btn-outline-secondary mb-2 ml-3"
              >
                Quit chatroom
              </Button>
            </Link>
          </Card.Title>
          <Card.Text>
            {Text.chat.userConnected}
            {this.state.allUsers.map(user => (
              <Badge
                key={_uniqueId("message-hr")}
                variant="success"
                className="ml-1"
              >
                {user.name}
              </Badge>
            ))}
          </Card.Text>
        </Card.Body>
        <hr />
        {chatMessages}
        <Container>
          <Row>
            <Col sm={10}>
              <input
                type="text"
                placeholder={Text.chat.placeholderText}
                aria-label={Text.chat.placeholderText}
                aria-describedby="basic-addon2"
                className="form-control mb-2"
                onChange={this.handleOnChangeText}
                onSubmit={this.submitChatMessage}
                onKeyDown={this.onKeyDown}
                value={this.state.chatMessage}
              />
            </Col>
            <Col sm={2}>
              <Button
                variant="outline-secondary"
                onClick={this.submitChatMessage}
                className="btn btn-outline-secondary mb-2"
              >
                {Text.chat.send}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default withAlert()(Chat);
