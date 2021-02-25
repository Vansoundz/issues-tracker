import { useEffect } from "react";

const usePreventScroll = (open: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (open) body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "initial";
    };
  }, [open]);
};

export { usePreventScroll };
