"use client";
import { toast, ToastBar, Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)} aria-label="Close">
                  ×
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}
