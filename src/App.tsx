import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Provider as AlertProvider,
  AlertComponentPropsWithStyle,
  positions,
  transitions
} from "react-alert";
import { Header } from "./components/header";
import Login from "./components/login";
import Chat from "./components/chat";
import "./App.css";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

const AlertTemplate = ({
  options,
  message,
  close
}: AlertComponentPropsWithStyle) => (
  <Alert
    key={options.type}
    variant={options.type === "success" ? "success" : "warning"}
    onClose={close}
    dismissible
  >
    {message}
  </Alert>
);

class App extends React.PureComponent {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="App">
          <Header></Header>
          <HashRouter>
            <Switch>
              <Route path="/chat" component={Chat} />
              <Route path="/" component={Login} />
            </Switch>
          </HashRouter>
        </div>
      </AlertProvider>
    );
  }
}

export default App;
