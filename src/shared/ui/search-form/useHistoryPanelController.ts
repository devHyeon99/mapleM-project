"use client";

import { useEffect, useRef, useState } from "react";

export function useHistoryPanelController() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyPanelRef = useRef<HTMLDivElement>(null);
  const skipOpenOnNextInputFocusRef = useRef(false);

  const openHistory = () => {
    setIsHistoryOpen(true);
  };

  const closeHistory = () => {
    setIsHistoryOpen(false);
  };

  const closeHistoryAndFocusInput = () => {
    setIsHistoryOpen(false);
    skipOpenOnNextInputFocusRef.current = true;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleInputFocus = () => {
    if (skipOpenOnNextInputFocusRef.current) {
      skipOpenOnNextInputFocusRef.current = false;
      return;
    }
    setIsHistoryOpen(true);
  };

  const handleFormKeyDownCapture = (
    event: React.KeyboardEvent<HTMLFormElement>,
  ) => {
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
  };

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
