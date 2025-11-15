"use client";

import { useState, JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SuggestedContact } from "@/app/page";

type SuggestedContactsProps = {
  contacts: SuggestedContact[];
  rationale: string;
  isLoading: boolean;
  renderSocialHandle: () => JSX.Element;
  generatedText: string;
};

export const SuggestedContacts = ({
  contacts,
  rationale,
  isLoading,
  renderSocialHandle,
  generatedText,
}: SuggestedContactsProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <Card className="shadow-md dark:bg-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          🎯 Saran Kontak
        </CardTitle>
        <CardDescription>
          Kementerian yang paling cocok untuk keluhan kamu
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading && !contacts.length && (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}
        {contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                  index === 0
                    ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                } ${expandedIndex === index ? "ring-2 ring-primary/50" : ""}`}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-1">
                    {index === 0 && (
                      <Badge className="mb-2 text-xs">Rekomendasi Utama</Badge>
                    )}
                    <h3 
                      className="font-semibold text-base line-clamp-2" 
                      title={contact.name}
                    >
                      {contact.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-sm font-bold"
                    >
                      {Math.round(contact.score * 100)}%
                    </Badge>
                    <span className={`text-gray-400 transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedIndex === index && (
                  <div className="mt-4 space-y-4 animate-in fade-in duration-200 border-t pt-4 dark:border-gray-700">
                    {index === 0 && rationale && (
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          💡 Kenapa kementerian ini?
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {rationale}
                        </p>
                      </div>
                    )}

                    {index === 0 && (
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          📱 Akun Resmi X/Twitter
                        </p>
                        {isLoading ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Mencari akun resmi...
                          </p>
                        ) : (
                          renderSocialHandle()
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {!isLoading && !contacts.length && generatedText && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            Tidak menemukan kontak spesifik untuk keluhan ini
          </p>
        )}
      </CardContent>
    </Card>
  );
};