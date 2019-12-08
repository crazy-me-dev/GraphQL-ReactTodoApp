import React from "react";

import styled from "../config/styles";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          Unfortunately something went wrong.{" "}
          <span role="img" aria-label="sad and embarrassed face">
            😓
          </span>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

const Wrapper = styled.div`
  color: #666;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export default ErrorBoundary;
