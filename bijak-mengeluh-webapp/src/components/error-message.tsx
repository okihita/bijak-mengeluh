"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "@/components/icons";

type ErrorMessageProps = {
  error: string | null;
  onRetry?: () => void;
};

export const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  return (
    <Card className="w-full mt-6 shadow-md bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50">
      <CardHeader>
        <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Waduh, Eror
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  );
};