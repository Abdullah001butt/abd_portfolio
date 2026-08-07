"use client";

import { useEffect } from "react";

/**
 * Backstop for the viewport meta's maximumScale/userScalable. Chrome,
 * Firefox, and Samsung Internet on Android honor that meta tag reliably;
 * iOS Safari has gone back and forth on respecting it across versions
 * (WebKit treats forced-disabled zoom as an accessibility regression), so
 * this covers the two gesture paths it can still sneak through on iOS:
 *   1. The non-standard `gesturestart`/`gesturechange` events Safari fires
 *      for pinch gestures (no other browser has these).
 *   2. A raw two-finger `touchmove`, which is what a pinch looks like at
 *      the touch-event level on every platform.
 * Renders nothing — it only attaches passive-false listeners for the
 * lifetime of the app.
 */
export default function DisablePinchZoom() {
  useEffect(() => {
    function preventGesture(e: Event) {
      e.preventDefault();
    }

    function preventMultiTouch(e: TouchEvent) {
      if (e.touches.length > 1) e.preventDefault();
    }

    // Safari-only events — not in the standard DOM lib types.
    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("touchmove", preventMultiTouch, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("touchmove", preventMultiTouch);
    };
  }, []);

  return null;
}
