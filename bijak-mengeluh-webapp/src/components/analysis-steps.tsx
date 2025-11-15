"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner, Check } from "@/components/icons";
import { AnalysisStep } from "@/app/page";

type AnalysisStepsProps = {
  steps: AnalysisStep[];
};

export const AnalysisSteps = ({ steps }: AnalysisStepsProps) => (
  <Card className="shadow-md dark:bg-card">
    <CardHeader>
      <CardTitle className="text-xl">Analisa</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center text-base">
            {step.status === "pending" && (
              <Spinner className="h-5 w-5 mr-3 text-gray-300" />
            )}
            {step.status === "loading" && (
              <Spinner className="h-5 w-5 mr-3 text-blue-500" />
            )}
            {step.status === "complete" && (
              <Check className="h-5 w-5 mr-3 text-green-500" />
            )}
            <span
              className={
                step.status === "pending"
                  ? "text-gray-400 dark:text-gray-600"
                  : step.status === "loading"
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
              }
            >
              {step.text}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);