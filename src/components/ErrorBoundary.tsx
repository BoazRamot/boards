import React from 'react';

interface IState {
  error: any;
  errorInfo: any;
}

export default class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  public render() {
    // if (this.state.errorInfo) {
    //   // Error path
    //   return (
    //     <div>
    //       <h2>Something went wrong.</h2>
    //       <details style={{ whiteSpace: 'pre-wrap' }}>
    //         {this.state.error && this.state.error.toString()}
    //         <br />
    //         {this.state.errorInfo.componentStack}
    //       </details>
    //     </div>
    //   );
    // }
    // Normally, just render children
    return this.props.children;
  }
}
