"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHistoryPanelController() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyPanelRef = useRef<HTMLDivElement>(null);
  const skipOpenOnNextInputFocusRef = useRef(false);

  const openHistory = useCallback(() => {
    setIsHistoryOpen(true);
  }, []);

  const closeHistory = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const closeHistoryAndFocusInput = useCallback(() => {
    setIsHistoryOpen(false);
    skipOpenOnNextInputFocusRef.current = true;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  const handleInputFocus = useCallback(() => {
    if (skipOpenOnNextInputFocusRef.current) {
      skipOpenOnNextInputFocusRef.current = false;
      return;
    }
    setIsHistoryOpen(true);
  }, []);

  const handleFormKeyDownCapture = useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.key !== "Escape" || !isHistoryOpen) return;

      const activeElement = document.activeElement;
      const isFocusInsideHistory =
        !!activeElement && historyPanelRef.current?.contains(activeElement);

      if (isFocusInsideHistory) {
        event.preventDefault();
        event.stopPropagation();
        closeHistoryAndFocusInput();
        return;
      }

      setIsHistoryOpen(false);
    },
    [closeHistoryAndFocusInput, isHistoryOpen],
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return {
    isHistoryOpen,
    containerRef,
    inputRef,
    historyPanelRef,
    openHistory,
    closeHistory,
    closeHistoryAndFocusInput,
    handleInputFocus,
    handleFormKeyDownCapture,
  };
}
