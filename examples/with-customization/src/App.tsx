import React from "react";
import { Container, Delete, Notification } from "rbx";
import { ThemeContext } from "rbx/base/theme";

import { themeValue } from "./theme";
import "./App.sass";

type HelloWorldNotificationProps = {};
type HelloWorldNotificationState = { active: boolean };

export class HelloWorldNotification extends React.Component<
  HelloWorldNotificationProps,
  HelloWorldNotificationState
> {
  constructor(props: HelloWorldNotificationProps) {
    super(props);
    this.state = { active: true };
  }

  onClose = () => {
    this.setState({ active: false });
  };

  render() {
    if (!this.state.active) {
      return (
        <div>
          <span>You've closed the notification </span>
          <span role="img" aria-label="shoe">
            👟
          </span>
        </div>
      );
    }

    return (
      <Notification color="react">
        <span>Welcome to </span>
        <span role="img" aria-label="shoe">
          👟
        </span>
        <strong> rbx</strong>
        <Delete onClick={this.onClose} />
      </Notification>
    );
  }
}

export default function App() {
  return (
    <ThemeContext.Provider value={themeValue}>
      <Container>
        <HelloWorldNotification />
      </Container>
    </ThemeContext.Provider>
  );
}
