'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset() {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'An unexpected error occurred.';
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            errorMessage = `Firestore Error: ${parsed.error} during ${parsed.operationType} on ${parsed.path}`;
            isFirestoreError = true;
          }
        }
      } catch (e) {
        // Not a JSON error message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
          <div className="prestige-card p-12 max-w-lg w-full text-center space-y-8 border-rose-500/20">
            <div className="mx-auto w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500">
              <AlertCircle size={40} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-display italic text-white tracking-tight">System Interruption</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                {isFirestoreError ? 'A database permission or connection issue was detected.' : 'The application encountered a critical error.'}
              </p>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-left">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Error Details</p>
                <p className="text-xs font-mono text-rose-400 break-words">{errorMessage}</p>
              </div>
            </div>

            <button 
              onClick={this.handleReset}
              className="prestige-button-primary w-full flex items-center justify-center gap-3 py-4"
            >
              <RefreshCcw size={18} />
              REINITIALIZE SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
