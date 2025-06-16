import React from 'react';

interface State { error: Error | null; }
export default class ErrorBoundary extends React.Component<{}, State> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, color: 'red' }}>
          <h1>¡Se produjo un error!</h1>
          <p><strong>Mensaje:</strong> {this.state.error.message}</p>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
