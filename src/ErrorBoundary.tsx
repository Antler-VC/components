import React from 'react';
import EmptyState, { IEmptyStateProps } from './EmptyState';

export default class ErrorBoundary extends React.Component<IEmptyStateProps> {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    // If it's a chunk issue, reload
    if (
      error.message.indexOf('Loading chunk') > -1 &&
      error.message.indexOf('failed') > -1
    )
      window.location.reload();
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: object) {
    console.log(error, errorInfo);
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <EmptyState
          message="Something Went Wrong"
          description={this.state.errorMessage}
          fullScreen
          {...this.props}
        />
      );
    }

    return this.props.children;
  }
}
