import React, { PropsWithChildren } from "react";
import { Container, FaceIcon } from "./ErrorBoundaryStyles";

interface State {
    hasError: boolean;
}
type Props<T extends object> = PropsWithChildren<T>;

export class ErrorBoundary<T extends object = object,> extends React.Component<Props<T>, State> {
    constructor(props: T) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error: unknown, errorInfo: unknown) {
      // Log error here
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <Container>
            <FaceIcon width={100} height={100} />
            <h1>Something went wrong...</h1>
          </Container>
        );
      }
  
      return this.props.children; 
    }
  }