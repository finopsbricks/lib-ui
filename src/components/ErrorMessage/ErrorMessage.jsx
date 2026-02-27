'use client';

import { AlertCircle, RefreshCw, Home, WifiOff, Lock, Server } from 'lucide-react';
import { Button, Alert, AlertDescription, AlertTitle } from '@fob/lib-ui';

function getErrorInfo(error) {
  const error_message = error?.message || 'An unexpected error occurred';
  const error_status = error?.status || error?.statusCode;

  if (error_status === 429 || error_message.toLowerCase().includes('rate limit')) {
    return {
      type: 'rate_limit',
      title: 'Rate Limit Exceeded',
      message: 'You have exceeded the request limit. Please wait a moment and try again.',
      icon: AlertCircle,
      suggestions: [
        'Wait a few moments before retrying',
        'Simplify your request if possible',
        'Contact support if this persists'
      ]
    };
  }

  if (error_status === 401 || error_message.toLowerCase().includes('unauthorized')) {
    return {
      type: 'auth',
      title: 'Authentication Required',
      message: 'Your session may have expired. Please refresh the page or sign in again.',
      icon: Lock,
      suggestions: [
        'Refresh the page',
        'Sign out and sign in again',
        'Clear your browser cache'
      ]
    };
  }

  if (error_status === 500 || error_status >= 500) {
    return {
      type: 'server',
      title: 'Server Error',
      message: 'Something went wrong on our end. Our team has been notified.',
      icon: Server,
      suggestions: [
        'Wait a few moments and try again',
        'Contact support if this persists',
        'Check our status page for updates'
      ]
    };
  }

  if (error_message.toLowerCase().includes('network') ||
      error_message.toLowerCase().includes('fetch') ||
      error_message.toLowerCase().includes('connection')) {
    return {
      type: 'network',
      title: 'Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
      icon: WifiOff,
      suggestions: [
        'Check your internet connection',
        'Try refreshing the page',
        'Disable any VPN or proxy'
      ]
    };
  }

  return {
    type: 'generic',
    title: 'Something Went Wrong',
    message: error_message,
    icon: AlertCircle,
    suggestions: [
      'Try refreshing the page',
      'Go back to the home page',
      'Contact support if this continues'
    ]
  };
}

export default function ErrorMessage({
  error,
  reset,
  showHomeButton = true,
  showDebugInfo = false
}) {
  const error_info = getErrorInfo(error);
  const Icon = error_info.icon;

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <Icon className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">
            {error_info.title}
          </AlertTitle>
          <AlertDescription className="mt-2">
            {error_info.message}
          </AlertDescription>
        </Alert>

        {error_info.suggestions && error_info.suggestions.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium text-sm mb-2">Try these steps:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {error_info.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          {reset && (
            <Button
              onClick={reset}
              variant="default"
              className="flex-1"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Button
              onClick={() => window.location.href = '/orgs'}
              variant="outline"
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>

        {(showDebugInfo || process.env.NODE_ENV === 'development') && error?.stack && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Debug Information
            </summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-x-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
