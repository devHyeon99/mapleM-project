"use client";

import { useSyncExternalStore } from "react";

const HOVER_DEVICE_QUERY = "(hover: hover) and (pointer: fine)";

const subscribers = new Set<() => void>();
let mediaQueryList: MediaQueryList | null = null;
let isHoverDeviceSnapshot = false;

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber());
};

const handleMediaQueryChange = (event: MediaQueryListEvent) => {
  isHoverDeviceSnapshot = event.matches;
  notifySubscribers();
};

const getMediaQueryList = () => {
  if (typeof window === "undefined") return null;

  mediaQueryList ??= window.matchMedia(HOVER_DEVICE_QUERY);
  isHoverDeviceSnapshot = mediaQueryList.matches;

  return mediaQueryList;
};

const subscribeToHoverDevice = (onStoreChange: () => void) => {
  subscribers.add(onStoreChange);

  const queryList = getMediaQueryList();
  if (queryList && subscribers.size === 1) {
    queryList.addEventListener("change", handleMediaQueryChange);
  }

  return () => {
    subscribers.delete(onStoreChange);

    if (queryList && subscribers.size === 0) {
      queryList.removeEventListener("change", handleMediaQueryChange);
    }
  };
};

const getHoverDeviceSnapshot = () => {
  getMediaQueryList();
  return isHoverDeviceSnapshot;
};

const getServerHoverDeviceSnapshot = () => false;

export const useHoverDevice = () => {
  return useSyncExternalStore(
    subscribeToHoverDevice,
    getHoverDeviceSnapshot,
    getServerHoverDeviceSnapshot,
  );
};
