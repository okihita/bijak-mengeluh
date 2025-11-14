"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestImagePage() {
  const [status, setStatus] = useState("");

  const testImage = async () => {
    try {
      setStatus("Generating...");
      const { generateShareImage } = await import("@/lib/share-image");
      
      const testText = "Jalanan di depan rumah saya rusak parah sudah 3 bulan tidak diperbaiki. Mohon segera ditindaklanjuti.";
      const blob = await generateShareImage(testText, "Kementerian PUPR");
      
      setStatus(`Success! Blob size: ${blob.size} bytes`);
      
      // Download for testing
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "test-image.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Image Generation Test</h1>
      <Button onClick={testImage}>Generate Test Image</Button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
