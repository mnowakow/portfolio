import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";

const STORAGE_KEY = "cookie-banner-dismissed";

// There is nothing to consent to here, this banner exists only to say so.
export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;

    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable, the banner just reappears next visit
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:flex-row sm:justify-between">
        <Typography type="small" className="text-left text-gray-500">
          No cookies here. This site does not use cookies, trackers or
          analytics, so there is nothing to ask your consent for.
        </Typography>
        <Button size="sm" onClick={dismiss} className="shrink-0">
          Got it
        </Button>
      </div>
    </div>
  );
}
