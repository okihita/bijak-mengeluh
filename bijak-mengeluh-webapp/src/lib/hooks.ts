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
