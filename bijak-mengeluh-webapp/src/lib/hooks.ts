import { useEffect, useState } from "react";

export const usePersistentState = <T,>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, mounted]);

  return [value, setValue];
};

export const useAutoSave = (
  value: string,
  key: string,
  delay: number = 10000,
) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!value) return;

    setIsSaving(true);
    const timer = setTimeout(() => {
      localStorage.setItem(key, value);
      setLastSaved(new Date());
      setIsSaving(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, key, delay]);

  return { lastSaved, isSaving };
};

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return { copied, copy };
};

export const useWebShare = () => {
  const share = (text: string) => {
    if (navigator.share) {
      navigator
        .share({ text })
        .catch((error) => console.error("Error sharing:", error));
    }
  };

  const shareAsImage = async (text: string, agency?: string) => {
    try {
      console.log("Starting image generation...");
      const { generateShareImage } = await import("@/lib/share-image");
      console.log("Module loaded, generating image...");
      const blob = await generateShareImage(text, agency);
      console.log("Image generated, blob size:", blob.size);
      const file = new File([blob], "keluhan.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        console.log("Using native share...");
        await navigator.share({ 
          files: [file],
          title: "Surat Keluhan",
          text: "Surat keluhan dari bijakmengeluh.id"
        });
      } else {
        console.log("Downloading image...");
        // Fallback: download image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "keluhan-bijakmengeluh.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("Download triggered");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert(`Gagal membuat gambar: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  return { share, shareAsImage };
};
