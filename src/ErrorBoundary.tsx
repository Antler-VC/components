import React from 'react';
import EmptyState, { IEmptyStateProps } from './EmptyState';

export interface IErrorBoundaryProps extends IEmptyStateProps {
  /** Called inside `componentDidCatch` */
  handleError?: (error: Error, errorInfo: object) => void;
}

/**
 * Displays an `EmptyState` when an error is caught inside.
 * Props will be passed to `EmptyState`.
 * If it is a chunk loading issue due to a new update being pushed, reloads.
 */
export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps
> {
  state = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    // If it's a chunk issue, reload
    if (
      error.message &&
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
    if (this.props.handleError) this.props.handleError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { handleError, ...props } = this.props;

      // You can render any custom fallback UI
      return (
        <EmptyState
          message="Something Went Wrong"
          description={this.state.errorMessage}
          fullScreen
          {...props}
        />
      );
    }

    return this.props.children;
  }
}
