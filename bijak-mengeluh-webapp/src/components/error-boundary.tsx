'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Ada masalah nih</h2>
            <p className="text-muted-foreground">Coba refresh halaman ya.</p>
            <Button onClick={() => window.location.reload()}>
              Refresh Halaman
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
