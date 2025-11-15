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
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-xl flex items-center gap-2">
          🎯 Saran Kontak
        </CardTitle>
        <CardDescription className="mt-1.5">
          Instansi yang paling cocok untuk keluhan kamu
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {isLoading && !contacts.length && (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        )}
        {contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                  index === 0
                    ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                } ${expandedIndex === index ? "ring-2 ring-primary/50 shadow-lg" : ""}`}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-2">
                    {index === 0 && (
                      <Badge className="text-xs">Rekomendasi Utama</Badge>
                    )}
                    <h3 
                      className="font-semibold text-base leading-snug line-clamp-2" 
                      title={contact.name}
                    >
                      {contact.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-sm font-bold px-2.5 py-0.5"
                    >
                      {Math.round(contact.score * 100)}%
                    </Badge>
                    <span className={`text-gray-400 transition-transform duration-200 ${expandedIndex === index ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedIndex === index && (
                  <div className="mt-4 space-y-3 animate-in fade-in duration-200 border-t pt-4 dark:border-gray-700">
                    {index === 0 && rationale && (
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          💡 Kenapa instansi ini?
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {rationale}
                        </p>
                      </div>
                    )}

                    {index === 0 && (
                      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
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
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            Tidak menemukan kontak spesifik untuk keluhan ini
          </p>
        )}
      </CardContent>
    </Card>
  );
};