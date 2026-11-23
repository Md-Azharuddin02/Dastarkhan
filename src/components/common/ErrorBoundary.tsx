import React from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-beige bg-surface p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-soft text-nonveg">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="mt-5 font-serif text-2xl font-semibold text-forest">
              Something went wrong
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              We encountered an unexpected error while displaying {SITE_CONFIG.brandName}. You can reload the page or return to the homepage.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-deep"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Return Home
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-beige bg-surface px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
