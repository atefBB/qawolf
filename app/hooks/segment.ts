import { useRouter } from "next/router";
import { useEffect } from "react";

import { isServer } from "../lib/detection";
import { User } from "../lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const hasSegment = !isServer() && (window as any).analytics;

export const identifySegmentUser = ({ id, email }: User): void => {
  if (!hasSegment) return;

  (window as any).analytics.identify(id, {
    email,
  });
};

export const trackSegmentEvent = (
  event: string,
  payload?: Record<string, unknown>
): void => {
  if (!hasSegment) return;

  (window as any).analytics.track(event, payload);
};

export const useSegmentPage = (): void => {
  const { pathname } = useRouter();

  useEffect(() => {
    if (!hasSegment) return;

    (window as any).analytics.page(pathname);
  }, [pathname]);
};