"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/icons";

export const AnalysisSteps = () => (
  <Card className="shadow-md dark:bg-card">
    <CardHeader>
      <CardTitle className="text-xl">Analisa</CardTitle>
    </CardHeader>
    <CardContent className="p-4 flex items-center justify-center">
      <Spinner className="h-6 w-6 text-blue-500" />
    </CardContent>
  </Card>
);