import { useMemo } from "react";

/**
 * Detects device performance capabilities.
 * Returns flags used to conditionally reduce animation complexity
 * on mobile and low-end hardware.
 */
export function useDevicePerformance() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return { isMobile: false, isLowEnd: false, prefersReducedMotion: false };
    }

    const isMobile = window.matchMedia("(max-width: 853px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Low core count typically signals a mobile/budget CPU
    const cores = navigator.hardwareConcurrency || 4;
    // deviceMemory is in GB; defaults to 8 when unavailable (desktop assumption)
    const memory = navigator.deviceMemory || 8;

    const isLowEnd =
      isMobile || prefersReducedMotion || cores <= 4 || memory <= 3;

    return { isMobile, isLowEnd, prefersReducedMotion };
  }, []);
}
